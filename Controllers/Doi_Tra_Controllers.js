const mongoose = require("mongoose");
const DoiTra = require("../Model/Doi_Tra");

module.exports = {
  REGISTER: async (req, res) => {
    try {
      const {
        ten_khach_hang,
        mat_hang,
        doi_tra,
        noi_gui,
        ngay_di_bao_hanh,
        ngay_ve_bao_hanh,
        so_xuat,
        so_nhap
      } = req.body;
      const DoiTraSave = new DoiTra({
        _id: new mongoose.Types.ObjectId(),
        ten_khach_hang,
        mat_hang,
        doi_tra,
        noi_gui,
        ngay_di_bao_hanh,
        ngay_ve_bao_hanh,
        so_xuat,
        so_nhap
      });
      const result = await DoiTraSave.save();
      res.status(200).json({
        doi_tra: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error,
      });
    }
  },
};
