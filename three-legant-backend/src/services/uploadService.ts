import cloudinary from "@/config/cloudinaryConfig";
import { nId } from "@/lib/utils/dbUtils";
import { UploadFileT } from "@/types";
import stream from "stream";

class UploadService {
  public static uploadToCloudinary(
    fileBuffer: Buffer,
    fileName: string
  ): Promise<UploadFileT | undefined> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: fileName,
          folder: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      const passThrough = new stream.PassThrough();
      passThrough.end(fileBuffer);
      passThrough.pipe(uploadStream);
    });
  }

  public static async uploadFiles(filesArray: File[]) {
    try {
      // Convert files to buffers and upload them concurrently
      const uploadPromises = filesArray.map(async (file) => {
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        return UploadService.uploadToCloudinary(
          fileBuffer,
          `${(file.name || "")?.substring(0, 4)}${nId(5)}_${Date.now() / 1000}`
        );
      });

      // Await all uploads to complete
      const uploadResponses = await Promise.all(uploadPromises);

      // Map the responses to the desired format
      const savedFiles = uploadResponses.map((uploadResponse) => ({
        secure_url: uploadResponse?.secure_url as string,
        public_id: uploadResponse?.public_id as string,
      }));

      return savedFiles;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  public static async deleteFile(publicId: string | string[]) {
    try {
      const ids = Array.isArray(publicId) ? publicId : [publicId];
      const res = await cloudinary.api.delete_resources(ids);
      return true;
    } catch (error) {
      return false;
    }
  }
}

// UploadService.deleteFile([
//   "three_latent/ Pro_1727097499382",
//   "three_latent/ 7 Pro_1727097499345",
//   "three_latent/ 7 Pro_1727097499384",
// ]);
export default UploadService;
