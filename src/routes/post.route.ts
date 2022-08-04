import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPostImageUrls,
  getPosts,
  updatePost,
} from "../controllers/PostController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

/**
 *
 * @api {GET} /api/posts/ Get all post by the logged in user
 * @apiName Blog API
 * @apiGroup Posts
 * @apiVersion  0.0.1
 *
 * @apiHeader  {String} JWT token of the user is required
 *
 * @apiSuccess (200) {json} Returns all post created by the logged in user.
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * [
 *   {
 *     "_id": "62eb671220ca55a00be94152",
 *     "user": "62eb664320ca55a00be94137",
 *     "title": "My second post",
 *     "body": "This post has a very long text on the body",
 *     "images": [
 *       "62eb671220ca55a00be9414b",
 *       "62eb671220ca55a00be9414c",
 *       "62eb671220ca55a00be9414d"
 *     ],
 *     "createdAt": "2022-08-04T06:28:34.655Z",
 *     "updatedAt": "2022-08-04T06:28:34.655Z",
 *     "__v": 0
 *   },
 *   {
 *     "_id": "62eb671220ca55a00be94152",
 *     "user": "62eb664320ca55a00be94137",
 *     "title": "My second post",
 *     "body": "This post has a very long text on the body",
 *     "images": [
 *       "62eb671220ca55a00be9414b",
 *       "62eb671220ca55a00be9414c",
 *       "62eb671220ca55a00be9414d"
 *     ],
 *     "createdAt": "2022-08-04T06:28:34.655Z",
 *     "updatedAt": "2022-08-04T06:28:34.655Z",
 *     "__v": 0
 *   },
 * ]
 *
 *
 */
router.get("/", authenticate, getPosts); // Get all posts

/**
 *
 * @api {POST} /api/posts/ Create a Post
 * @apiName Blog API
 * @apiGroup Posts
 * @apiVersion  0.0.1
 *
 * @apiHeader  {String} JWT token of the user is required
 * @apiBody   {String} Title Title of the post
 * @apiBody   {String} Body Body of the post
 * @apiBody   {Files} Files Images for the post
 *
 * @apiSuccess (200) {json} Returns the newly created post.
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  error: false,
 *  message: "Post created successfully"
 *   {
 *     "_id": "62eb671220ca55a00be94152",
 *     "user": "62eb664320ca55a00be94137",
 *     "title": "My second post",
 *     "body": "This post has a very long text on the body",
 *     "images": [
 *       "62eb671220ca55a00be9414b",
 *       "62eb671220ca55a00be9414c",
 *       "62eb671220ca55a00be9414d"
 *     ],
 *     "createdAt": "2022-08-04T06:28:34.655Z",
 *     "updatedAt": "2022-08-04T06:28:34.655Z",
 *     "__v": 0
 *   }
 * }
 *
 */
router.post("/", authenticate, createPost); // Create a post

/**
 *
 * @api {POST} /api/posts/:id Update a Post
 * @apiName Blog API
 * @apiGroup Posts
 * @apiVersion  0.0.1
 *
 * @apiHeader  {String} JWT token of the user is required
 * @apiParam   {String} id ID of the post
 * @apiBody   {String} Title Title of the post
 * @apiBody   {String} Body Body of the post
 * @apiBody   {String} Files Images for the post
 *
 * @apiSuccess (200) {json} Returns the updated post.
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  error: false,
 *  message: "Post updated successfully"
 *   {
 *     "_id": "62eb671220ca55a00be94152",
 *     "user": "62eb664320ca55a00be94137",
 *     "title": "My second post",
 *     "body": "This post has a very long text on the body",
 *     "images": [
 *       "62eb671220ca55a00be9414b",
 *       "62eb671220ca55a00be9414c",
 *       "62eb671220ca55a00be9414d"
 *     ],
 *     "createdAt": "2022-08-04T06:28:34.655Z",
 *     "updatedAt": "2022-08-04T06:28:34.655Z",
 *     "__v": 0
 *   }
 * }
 *
 */
router.post("/:id", authenticate, updatePost); // Update a post

/**
 *
 * @api {GET} /api/posts/:id Get a Post by it's ID
 * @apiName Blog API
 * @apiGroup Posts
 * @apiVersion  0.0.1
 *
 * @apiHeader  {String} JWT token of the user is required
 * @apiParam   {String} id ID of the post
 *
 * @apiSuccess (200) {json} Returns the requested post.
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  error: false,
 *  post: {
 *     "_id": "62eb671220ca55a00be94152",
 *     "user": "62eb664320ca55a00be94137",
 *     "title": "My second post",
 *     "body": "This post has a very long text on the body",
 *     "images": [
 *       "62eb671220ca55a00be9414b",
 *       "62eb671220ca55a00be9414c",
 *       "62eb671220ca55a00be9414d"
 *     ],
 *     "createdAt": "2022-08-04T06:28:34.655Z",
 *     "updatedAt": "2022-08-04T06:28:34.655Z",
 *     "__v": 0
 *   }
 * }
 *
 */
router.get("/:id", getPost); // Read a post

/**
 *
 * @api {DELETE} /api/posts/:id Delete a Post by it's ID (owned by the logged in user)
 * @apiName Blog API
 * @apiGroup Posts
 * @apiVersion  0.0.1
 *
 * @apiHeader  {String} JWT token of the user is required
 * @apiParam   {String} id ID of the post
 *
 * @apiSuccess (200) {json} Returns the deleted post.
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  error: false,
 *  post: {
 *     "_id": "62eb671220ca55a00be94152",
 *     "user": "62eb664320ca55a00be94137",
 *     "title": "My second post",
 *     "body": "This post has a very long text on the body",
 *     "images": [
 *       "62eb671220ca55a00be9414b",
 *       "62eb671220ca55a00be9414c",
 *       "62eb671220ca55a00be9414d"
 *     ],
 *     "createdAt": "2022-08-04T06:28:34.655Z",
 *     "updatedAt": "2022-08-04T06:28:34.655Z",
 *     "__v": 0
 *   }
 * }
 *
 */
router.delete("/:id", authenticate, deletePost); // Delete a post

/**
 *
 * @api {GET} /api/posts/:id/images Get image urls of a post.
 * @apiName Blog API
 * @apiGroup Posts
 * @apiVersion  0.0.1
 *
 * @apiParam   {String} id ID of the post
 *
 * @apiSuccess (200) {json} Returns the image links of the post requested.
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  "error": false,
 *  "urls": [
 *    "http://localhost:3000/api/images/1659594514632-blogApi-beneco.png",
 *    "http://localhost:3000/api/images/1659594514632-blogApi-beneco.png",
 *    "http://localhost:3000/api/images/1659594514632-blogApi-beneco.png"
 *  ]
 * }
 *
 */
router.get("/:id/images", getPostImageUrls); // Get image urls of post

export default router;
