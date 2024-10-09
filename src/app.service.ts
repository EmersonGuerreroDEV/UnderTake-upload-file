import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';

@Injectable()
export class CloudinaryService {
  constructor() {

  }


  async uploadFile(file: { buffer: Buffer, originalname: string }): Promise<string> {
    console.log(file)
    if (!file) {
      throw new Error('No file provided');
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
      // Usa upload_stream para subir el buffer
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', public_id: file.originalname }, // Asigna un public_id opcionalmente
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result.secure_url); // Retorna la URL segura de la imagen
        }
      );

      // Enviar el buffer al stream
      stream.end(file.buffer);
    });
  }
}