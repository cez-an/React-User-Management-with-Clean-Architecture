import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import userRouter from "./presentation/express/routers/userRouter";
import authRouter from "./presentation/express/routers/authRouter";
import adminRouter from "./presentation/express/routers/adminRouter";
import { morganMiddleware } from "./presentation/express/middlewares/morganMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";



dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(morganMiddleware);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbacksecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ping" });
});

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;
