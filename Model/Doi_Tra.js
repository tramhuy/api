const mongoose = require("mongoose");
const moment = require("moment");
const createdAt = moment().format();
const DoiTraSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  ten_khach_hang: { type: String, required: true },
  mat_hang: { type: String, required: true },
  doi_tra: { type: String, required: true },
  noi_gui: { type: String, required: true },
  ngay_di_bao_hanh: { type: String, default: null },
  ngay_ve_bao_hanh: { type: String, default: null },
  so_xuat: { type: Number, required: true },
  so_nhap: { type: Number, required: true },
  ngay_nhan: { type: String, default: createdAt },
});
const Doi_Tra = mongoose.model("Doi_Tra", DoiTraSchema);
module.exports = Doi_Tra;
