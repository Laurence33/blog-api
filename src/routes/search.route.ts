import { Router } from "express";
import { searchPosts } from "../controllers/SearchController";
import { removeUnsupportedFilter } from "../middlewares/removeUnsupportedFilters";

const searchRouter = Router();

searchRouter.get("/", removeUnsupportedFilter, searchPosts);

export default searchRouter;
