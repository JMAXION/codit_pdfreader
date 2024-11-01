const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// 파일 업로드 엔드포인트
app.post("/upload", upload.single("pdf"), (req, res) => {
  res.json({ filePath: `uploads/${req.file.filename}` });
});

// 정적 파일 제공
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
