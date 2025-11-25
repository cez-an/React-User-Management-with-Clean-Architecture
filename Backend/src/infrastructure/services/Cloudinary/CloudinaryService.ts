import cloudinary from "./config/cloudinary";

export class CloudinaryService {
  async upload(base64: string): Promise<string> {
    const result = await cloudinary.uploader.upload(base64, {
      folder: "profile_images",
      resource_type: "image",
    });

    return result.secure_url;
  }
}
