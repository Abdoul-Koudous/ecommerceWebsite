import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import { v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import { match } from "assert";
import { text } from "stream/consumers";

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
})

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Indiquer votre email, nom et mot de passe",
                error: true,
                success: false
            });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return response.status(400).json({
                message: "Cet email est déjà enregistré",
                error: true,
                success: false
            });
        }

        // Générer un code de vérification
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hasher le mot de passe
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Créer le nouvel utilisateur
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            otp: verifyCode,
            otpExpires: Date.now() + 600000 // 10 minutes
        });

        await newUser.save();

        // Envoyer l'email de vérification
        await sendEmailFun(
            email,
            "Vérification de votre email sur YebouShop",
            "",
            VerificationEmail(name, verifyCode)
        );

        // Générer le token JWT
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY,
            { expiresIn: '7d' }
        );

        return response.status(201).json({
            success: true,
            error: false,
            message: "Inscription réussie, veuillez vérifier votre email.",
            token
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { email, otp } = request.body;

        // Vérifier si l'utilisateur existe
        const user = await UserModel.findOne({ email });

        if (!user) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "Utilisateur non trouvé"
            });
        }

        // Vérifier si l'OTP correspond
        const isCodeValid = user.otp === otp;

        // Vérifier si l'OTP n'est pas expiré
        const isNotExpired = user.otpExpires && user.otpExpires > Date.now();

        if (!isCodeValid) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "OTP invalide"
            });
        }

        if (!isNotExpired) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "OTP expiré"
            });
        }

        // Si tout est bon → valider l'email
        user.verify_email = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return response.status(200).json({
            error: false,
            success: true,
            message: "Email vérifié avec succès"
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function loginUserController(request, response) {
   try {

        const {email, password} =  request.body;
        const user = await UserModel.findOne({email:email});

        if(!user){
            return response.status(400).json({
                message: "L'utilisateur n'est pas enregistrer",
                error:true,
                success:false
            })
        }

        if (user.status!=="Active"){
            return response.status(400).json({
                message: "Contactez l'administrateur",
                error:true,
                success:false
            })
        }

        if (user.verify_email!==true){
            return response.status(400).json({
                message: "Votre email n'est pas été verifier",
                error:true,
                success:false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if(!checkPassword){
            return response.status(400).json({
                message: "Verifier votre mot de passe",
                error:true,
                success:false
            })

        }

        const accesstoken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);
        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accesstoken,cookiesOption)
        response.cookie('refreshToken',refreshToken,cookiesOption)

        return response.json({
            message : "La connexion faite avec succès",
            error: false,
            success : true,
            date : {
                accesstoken,
                refreshToken
            }
        })
   } catch (error) {
    return response.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
    
   }
    
}


export async function logoutController(request,response) {
    try {
        const userid = request.userId
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.clearCookie("accessToken", cookiesOption)
        response.clearCookie("refreshToken", cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })
        return response.json({
            message : "Deconnexion faite avec succès",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
    
}

var imagesArr = [];
export async function userAvatarController(request, response) {
    try {
        imagesArr = [];

        const userId = request.userId;
        const image = request.files;

        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return response.status(500).json({
                message: "Utilisateur introuvable",
                error: true,
                success: false
            });
        }

        // --- SUPPRESSION DE L’ANCIEN AVATAR ---
        const imgUrl = user.avatar;

        if (imgUrl) {
            const urlArr = imgUrl.split("/");
            const avatar_image = urlArr[urlArr.length - 1];
            const imageName = avatar_image.split(".")[0];

            if (imageName) {
                await cloudinary.uploader.destroy(imageName);
            }
        }

        // --- UPLOAD DES NOUVEAUX AVATARS ---
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {
            await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`telechargements/${request.files[i].filename}`);
                }
            );
        }

        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,
            avatar: imagesArr[0]
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}



export async function removeImageFromCloudinary(request,response) {
    const imgUrl = request.query.img;
   
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if(imageName){
        const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {
            
        }
    );
    if (res){
        response.status(200).send(res);
    }
    }

}

export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId;
        const { name, email, mobile, password } = request.body;

        // Vérifier que l'utilisateur existe
        const userExist = await UserModel.findById(userId);
        if (!userExist) {
            return response.status(400).json({
                message: "L'utilisateur ne peut pas être mis à jour",
                error: true,
                success: false
            });
        }

        // Générer OTP si email changé
        let verifyCode = "";
        if (email && email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }

        // Hasher le mot de passe si modifié
        let hashedPassword = userExist.password;
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashedPassword = await bcryptjs.hash(password, salt);
        }

        // Envoyer l’email avec le code si email changé
        if (verifyCode !== "") {
            const emailSent = await sendEmailFun(
                email,
                "Vérification d'email Yeboushop",
                "",
                VerificationEmail(name || userExist.name, verifyCode)
            );

            if (!emailSent) {
                return response.status(500).json({
                    message: "Impossible d'envoyer le code de vérification",
                    error: true,
                    success: false
                });
            }
        }

        // Mise à jour de l'utilisateur
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name || userExist.name,
                mobile: mobile || userExist.mobile,
                email: email || userExist.email,
                verify_email: verifyCode === "" ? userExist.verify_email : false,
                password: hashedPassword,
                otp: verifyCode !== "" ? verifyCode : null,
                otpExpires: verifyCode !== "" ? Date.now() + 600000 : null
            },
            { new: true }
        );

        return response.status(200).json({
            message: "L'utilisateur mis à jour avec succès",
            error: false,
            success: true,
            user: updateUser
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
