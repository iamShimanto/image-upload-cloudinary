import React, { useState } from "react";
import axios from "axios";



const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("")

  const handleSubmit = async () => {
    if (!file) return alert("please choose a file to upload");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      if (res.status === 201) {
        alert("uploaded successfully")
        setImageUrl(res.data.imageUrl);
      }
    } catch (error) {
      console.error("upload failed", error);
    }
  };

  return (
    <>
      <h2>Image upload</h2>

      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleSubmit}>submit</button>
        {
          imageUrl && <img src={imageUrl} alt="image" />
        }
      </div>
    </>
  );
};

export default ImageUpload;
