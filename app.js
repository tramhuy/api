const moment = require("moment");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sever = require("http").createServer(app);
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const BaoHanh = require("./Model/Bao_Hanh");
// connection
require("dotenv").config();
require("./initDB")();
// app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methoads", "PUT, POST, DELETE, GET");
  next();
});

// socket io
const io = require("socket.io")(sever, {
  cors: {
    origin: "http://tamhuy.surge.sh"
  },
});
io.on("connection", (socket) => {
  socket.on('clientAddBaoHanh', async (msg) => {
    const createdAt = moment().format();
    const {
      soSeri,
      TenKhachHang,
      SoDienThoai,
      SoLuong,
      MatHang,
      PhuKien,
      TinhTrang,
      NgayMua,
      NoiGui,
      NgayVe,
      XacNhan,
      NgayTra,
      NguoiNhan
    } = msg.add;
    const BaoHanhSave = new BaoHanh({
      _id: new mongoose.Types.ObjectId(),
      soSeri,
      TenKhachHang,
      SoDienThoai,
      SoLuong,
      MatHang,
      PhuKien,
      TinhTrang,
      NgayMua,
      NoiGui,
      NgayVe,
      XacNhan,
      NgayTra,
      NguoiNhan,
      NgayTao: createdAt
    });
    const result = await BaoHanhSave.save();
    io.sockets.emit("severSeenAddBaoHanh", result);
  });
  socket.on('clientDeleteBaoHanh', async (_id) => {
    if (_id) {
      await BaoHanh.findByIdAndDelete(_id);
      io.sockets.emit("severSeenDeleteBaoHanh", _id);
    }
  });
  socket.on('clientEditBaoHanh', async (dataReq) => {
    const { _id, edit } = dataReq;
    const result = await BaoHanh.findByIdAndUpdate(_id, edit, { new: true });
    const dataRes = {
      _id: _id,
      data: result
    }
    io.sockets.emit("severSeenEditBaoHanh", dataRes);
  });
})
//router

const Bao_Hanh_Router = require("./Router/Bao_Hanh");
const Doi_Tra_Router = require("./Router/Doi_Tra");
const User_Router = require("./Router/User");

app.use("/api/bao-hanh", Bao_Hanh_Router);
app.use("/api/doi-tra", Doi_Tra_Router);
app.use("/api/user", User_Router);

app.use((req, res, next) => {
  res.send("hello");
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

sever.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
