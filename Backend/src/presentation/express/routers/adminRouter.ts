import { Router } from "express";
import { AdminAuthController } from "../../http/controllers/Authenticate/AdminAuthController";
import { AdminController } from "../../http/controllers/admin/AdminController";

const adminAuthController = new AdminAuthController();
const adminController = new AdminController();
const router = Router();

router.post("/login", (req, res) => adminAuthController.login(req, res));
router.post("/logout", (req, res) => adminAuthController.logout(req, res));
router.get("/listUsers", (req, res) => adminController.listUsers(req, res));
router.patch("/users/:id/block", (req, res) => adminController.blockUser(req, res));
router.patch("/users/:id/unblock", (req, res) => adminController.unblockUser(req, res));

export default router;
