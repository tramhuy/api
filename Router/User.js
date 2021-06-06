const express = require("express");
const router = express.Router();
const User = require("../Controllers/User_Controllers");

router.post("/dang-ky", User.REGISTER);
router.post("/dang-nhap", User.LOGIN);
router.get("/thong-tin", User.PROFILE);

module.exports = router;
