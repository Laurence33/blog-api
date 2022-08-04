import { Router } from "express";
import { validateLoginDetails } from "../middlewares/validators/validate-login-details";
import {
  createLogin,
  login,
  logout,
  refreshToken,
} from "../controllers/AuthController";

const router = Router();

/**
 *
 * @api {POST} /api/auth/login Login User
 * @apiName Blog API
 * @apiGroup Authentication
 * @apiVersion  0.0.1
 *
 * @apiBody  {String} username Username for login
 * @apiBody  {String} password Password for login
 *
 * @apiSuccess (200) {json} Login Success User have logged in successfully
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *    error: false,
 *    message: "Login has been successful.",
 * }
 *
 *
 */
router.post("/login", validateLoginDetails, login);

/**
 *
 * @api {DELETE} /api/auth/logout Logout User
 * @apiName Blog API
 * @apiGroup Authentication
 * @apiVersion  0.0.1
 *
 * @apiHeader  {String} x-auth-token JWT token of user
 * @apiHeader  {Cookie} refresh-token JWT Refresh token of user
 *
 * @apiSuccess (204) No Content User has been logged out
 *
 *
 */
router.delete("/logout", logout);

/**
 *
 * @api {POST} /api/auth/refresh Refresh the JWT of User
 * @apiName Blog API
 * @apiGroup Authentication
 * @apiVersion  0.0.1
 *
 * @apiHeader  {Cookie} refresh-token Refresh token of the user
 *
 * @apiSuccess (200) {json} Tokens are successfully refresh
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  error: false,
 *  message: "Tokens refreshed!"
 * }
 *
 *
 */
router.post("/refresh", refreshToken);

/**
 *
 * @api {POST} /api/auth/register Register new User
 * @apiName Blog API
 * @apiGroup Authentication
 * @apiVersion  0.0.1
 *
 * @apiBody  {String} username Username for login
 * @apiBody  {String} password Password for login
 *
 * @apiSuccess (200) {json} Registration Successful
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  error: false,
 *  message: "User has been created successfully."
 * }
 *
 *
 */
router.post("/register", validateLoginDetails, createLogin);

export default router;
