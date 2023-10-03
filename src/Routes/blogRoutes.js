const express=require("express")
const { getBlogStatistics,searchBlogs} = require("../controller/blogcontroller")
const router=express.Router()
router.get('/blog-stats',getBlogStatistics)
router.get('/search',searchBlogs)
module.exports =router

