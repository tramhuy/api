const express = require("express");
const router = express.Router();

const Bao_Hanh = require("../Controllers/Bao_Hanh_Controllers");

router.get("/danh-sach", Bao_Hanh.GET_LIST);
router.get("/get-id", Bao_Hanh.GET_ID);

module.exports = router;
