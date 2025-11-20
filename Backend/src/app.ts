import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import userRouter from './presentation/express/routers/userRouter'
import authRouter from './presentation/express/routers/authRouter'
import adminRouter from './presentation/express/routers/adminRouter'
import { morganMiddleware } from './presentation/express/middlewares/morganMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morganMiddleware);
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SESSION_SECRET || "fallbacksecret",
    resave:false,
    saveUninitialized:false,
    cookie: {secure:false}
}));

app.get('/',(req,res)=>{
    res.json({message:'ping'});
})

app.use('/admin',adminRouter)
app.use('/auth',authRouter);
app.use('/users', userRouter);

export default app;