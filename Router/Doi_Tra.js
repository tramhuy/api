const express = require("express");
const router = express.Router();

const Doi_Tra = require("../Controllers/Doi_Tra_Controllers");

router.post("/tao-doi-tra", Doi_Tra.REGISTER);
module.exports = router;
