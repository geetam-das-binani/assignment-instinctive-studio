import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import {userRoutes} from './routes/userRoute.mjs';
import {postRoutes} from './routes/postRoute.mjs';
import path from "path";
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
    "*",
    cors({
      origin: true,
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use('/api/v1',userRoutes);
app.use('/api/v1',postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// cd frontend && npm install && npm run build  && cd ../backend && npm run build 


// start command -> cd backend && npm start 