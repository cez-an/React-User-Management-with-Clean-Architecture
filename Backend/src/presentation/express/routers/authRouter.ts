import { Router } from "express";
import { AuthController } from "../../http/controllers/Authenticate/AuthController";
import { AuthControllerr } from "./AuthControllerr";
const authController = new AuthController();
const router = Router();
const authControllerr = new AuthControllerr();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/refresh", (req, res) => authController.refresh(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));
router.get("/me", (req, res) => authControllerr.me(req, res));


export default router;
