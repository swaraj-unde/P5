import { imageUploadUtil } from "../../utils/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {


    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url);


    return res.status(200).json({
      success: true,
      message: "Image Upload Successful",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error While Uploading The Image",
      error: error.message,
    });
  }
};

export default handleImageUpload;
