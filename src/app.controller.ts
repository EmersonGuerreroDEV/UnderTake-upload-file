import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CloudinaryService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  @MessagePattern({ cmd: 'upload-profile-picture' })
  async uploadFile(data: { file: string; originalname: string; mimetype: string }) {
    console.log("Datos recibidos en microservicio:", data);

    if (!data.file) {
      throw new Error('No se recibió un archivo válido.');
    }

    // Convertir la cadena base64 de vuelta a un buffer
    const fileBuffer = Buffer.from(data.file, 'base64');

    console.log("Es buffer?", Buffer.isBuffer(fileBuffer)); // Esto debería devolver true

    // Subir archivo a Cloudinary
    const result = await this.cloudinaryService.uploadFile({ buffer: fileBuffer, originalname: data.originalname, mimetype: data.mimetype });
    return { url: result };
  }


}
