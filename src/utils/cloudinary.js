import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; 

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File has been uploaded:", uploadResult.url);
    
    // Delete the local file after successful upload
    fs.unlinkSync(localFilePath);
    
    return uploadResult;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Try deleting the local file even if upload fails
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (fsError) {
      console.error("Error deleting local file:", fsError);
    }

    return null;
  }
};

export { uploadCloudinary };
