import { Router } from "express";
import { UserController } from "../../http/controllers/User/UserController";


const userController = new UserController();
const router = Router();

router.post("/signup", (req, res) => userController.signup(req, res));
router.put("/update/:id", (req, res) => userController.update(req, res));
router.get("/findUser/:id", (req, res) => userController.findUser(req, res));





export default router;
