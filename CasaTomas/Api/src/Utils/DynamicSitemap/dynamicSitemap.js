import express from "express";
import { SiteMapFunc } from "./sitemapcontroller.js";

const sitemapRouter = express.Router();

sitemapRouter.get("/sitemap.xml", SiteMapFunc);

export default sitemapRouter;
