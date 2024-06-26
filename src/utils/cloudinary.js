import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      quality: "auto",
      transformation: [{ width: 500, crop: "scale" }, { fetch_format: "auto" }],
      folder: "eCommerce",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("error while uploading to the cloudinary", error);
    return null;
  }
};

const deleteFromCloudinary = async (imgUrl, type) => {
  try {
    if (!imgUrl) return null;
    let imgArray = imgUrl.split("/");
    let publicId = imgArray
      .slice(imgArray.length - 2, imgArray.length)
      .join("/")
      .split(".")[0];
    let response = await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
    });
    return response;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
