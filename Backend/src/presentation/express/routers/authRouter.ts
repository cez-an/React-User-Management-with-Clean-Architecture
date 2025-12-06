import { Router } from "express";
import { AuthController } from "../../http/controllers/Authenticate/AuthController";
import { AuthControllerr } from "./AuthControllerr";

const authController = new AuthController();
const authControllerr = new AuthControllerr();
const router = Router();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));
router.get("/me", (req, res) => authControllerr.me(req, res));


export default router;
