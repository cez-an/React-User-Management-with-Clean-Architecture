import { Router } from "express";
import { AuthController } from "../../http/controllers/Authenticate/AuthController";

const authController = new AuthController();
const router = Router();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

export default router;
