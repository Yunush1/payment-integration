const router = require("express").Router();
const {createUser, loginUser,getUser} = require("../payment_service/user.controller");

router.post("/user",createUser);
router.get("/user",loginUser);
router.get("/admin/user",getUser);

module.exports = router;