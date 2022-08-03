import { Router } from "express";
import { validateLoginDetails } from "../middlewares/validators/validate-login-details";
import {
  createLogin,
  login,
  logout,
  refreshToken,
} from "../controllers/AuthController";

const router = Router();

router.post("/login", validateLoginDetails, login);

router.delete("/logout", logout);

router.post("/refresh", refreshToken);

router.post("/register", createLogin);

export default router;
