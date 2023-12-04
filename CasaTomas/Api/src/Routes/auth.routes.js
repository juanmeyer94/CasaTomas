import {Router} from "express";
import {login, register, logout, dashboard, verifyToken} from "../Controllers/auth.controller.js"
import { authRequired } from "../middleware/validateToken.js";
import {validateSchema} from "../middleware/validateSchema.js"
import {registerSchema, loginSchema} from "../schemas/user.schema.js"

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema),login)
router.post("/logout", logout)

router.get("/verify", verifyToken);
router.get("/dashboard",authRequired , dashboard )

export default router;