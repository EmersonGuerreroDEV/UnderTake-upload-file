import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';

@Injectable()
export class CloudinaryService {
  constructor() {

  }


  async uploadFile(file: { buffer: Buffer; originalname: string; mimetype: string }) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', public_id: file.originalname },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(file.buffer); // Enviar el buffer al stream
    });
  }


}