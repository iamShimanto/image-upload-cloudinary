const express = require("express");
const upload = require("./src/utils/multer");
const app = express();
const port = 3000;
const cloudinary = require("./src/utils/cloudinaryConfig")
const fs = require("fs")
const cors = require("cors")

app.use(cors())
// app.use(express.json())



app.get("/", (req, res) => {
  res.send("image upload");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) res.status(400).json({ error: "file not found" });
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder : "uploads"
    })

    fs.unlinkSync(req.file.path)

    res.status(201).json({message : "file uploaded successfully!", imageUrl : result.secure_url})

  } catch (error) {
    res.status(500).json({ error: "upload failed" });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
