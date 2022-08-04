import { Router } from "express";
import { searchPosts } from "../controllers/SearchController";
import { removeUnsupportedFilter } from "../middlewares/removeUnsupportedFilters";

const searchRouter = Router();

/**
 *
 * @api {POST} /api/search/ Search/Filter Posts
 * @apiName Blog API
 * @apiGroup Search
 * @apiVersion  0.0.1
 *
 * @apiParam   {String} keyword Optional Keyword to match the title or body of a post
 * @apiParam   {Date} startDate Optional Starting date to search for
 * @apiParam   {Date} sendDate Optional Ending date to search for
 * @apiParam   {Number} limit Optional Limit the result to return, Default to 10
 *
 * @apiSuccess (200) {json} Returns the list of matching posts.
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * [
  {
    "_id": "62eb671220ca55a00be94152",
    "user": "62eb664320ca55a00be94137",
    "title": "My second post",
    "body": "This post has a very long text on the body",
    "images": [
      "62eb671220ca55a00be9414b",
      "62eb671220ca55a00be9414c",
      "62eb671220ca55a00be9414d"
    ],
    "createdAt": "2022-08-04T06:28:34.655Z",
    "updatedAt": "2022-08-04T06:28:34.655Z"
  }
]
 *
 */
searchRouter.get("/", removeUnsupportedFilter, searchPosts);

export default searchRouter;
