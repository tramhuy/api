const mongoose = require("mongoose");
const BaoHanhSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  soSeri: { type: String, required: true },
  TenKhachHang: { type: String, required: true },
  SoDienThoai: { type: Number, default: null },
  SoLuong: { type: Number, required: true },
  MatHang: { type: String, required: true },
  PhuKien: { type: String, required: true },
  TinhTrang: { type: String, required: true },
  NgayMua: { type: String, required: true },
  NoiGui: { type: String, required: true },
  NgayVe: { type: String, required: null },
  XacNhan: { type: String, default: null },
  NgayTra: { type: String, default: null },
  NguoiNhan: { type: String, default: null },
  NgayTao: { type: String, required: true },
});
const Bao_Hanh = mongoose.model("Bao_Hanh", BaoHanhSchema);
module.exports = Bao_Hanh;
