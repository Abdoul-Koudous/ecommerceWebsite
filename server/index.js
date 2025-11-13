import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDb from "./config/connectDB.js";
import userRouter from './route/user.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🧩 Middlewares globaux
app.use(cors());
// app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// ✅ Route test
app.get("/", (req, res) => {
  res.json({
    message: `🚀 Le serveur est en cours d'exécution sur le port ${PORT}`,
  });
});

app.use('/api/users', userRouter)

// 🔗 Connexion à MongoDB + Lancement du serveur
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Serveur en cours d'exécution sur le port ${PORT}`);
  });
});
