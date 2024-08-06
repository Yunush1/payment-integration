const router = require("express").Router();
const {getBlogs} = require("../payment_service/blog.controller");

router.get('/blog', getBlogs);

module.exports = router;