import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from '../utils/verifyEmailTemplate.js';

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
