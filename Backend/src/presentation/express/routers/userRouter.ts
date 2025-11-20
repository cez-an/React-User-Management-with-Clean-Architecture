import { Router } from "express";
import { UserController } from "../../http/controllers/User/UserController";

const userController = new UserController();
const router = Router();

router.post("/signup", (req, res) => userController.signup(req, res));

export default router;
