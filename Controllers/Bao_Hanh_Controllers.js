const BaoHanh = require("../Model/Bao_Hanh");
class ApiFeatures {
  constructor(query) {
    this.query = query;
  }
  sortProduct() {
    this.query = this.query.sort('-NgayTao')
    return this;
  }
}
module.exports = {
  GET_LIST: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      const features = new ApiFeatures(BaoHanh.find(), req.query).sortProduct();
      const List = await features.query;
      const resultList = List.slice(start, end);
      res.status(200).json({
        length: resultList.length,
        length_total: List.length,
        data: resultList,
      })
    } catch (error) {
      console.log(error)
    }
  },
  GET_ID: async (req, res) => {
    try {
      const { id } = req.query;
      const result = await BaoHanh.findById(id);
      if (!result) return res.status(400).json({ message: 'no product found' });
      res.status(200).json({
        data: result
      });
    } catch (error) {
      console.log(error)
    }
  }
};
