import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Veuillez indiquer votre nom"]
    },
    email: {
        type: String,
        required: [true, "Veuillez indiquer votre email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Veuillez indiquer votre mot de passe"]
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspendu"],
        default: "Active"
    },
    address_details: {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    },
    shopping_cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'cartProduit'
    },
    orderHistory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Commande'
    },
    opt: {
        type: String
    },
    optExpires: {
        type: Date
    },
    role: {
        type: String,
        enum: ['ADMIN', "UTILISATEUR"],
        default: "UTILISATEUR"
    }
}, { timestamps: true });

const UserModel = mongoose.model("Utilisateur", userSchema);
export default UserModel;
