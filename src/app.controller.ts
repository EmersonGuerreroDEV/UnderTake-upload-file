import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './app.service';
import { Express } from 'express'; // Asegúrate de que Express esté instalado
import { MessagePattern } from '@nestjs/microservices';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  @MessagePattern({ cmd: 'upload-profile-picture' })
  async uploadFile(data: any) {
    console.log("Archivo recibido:", data); // Verifica que el archivo llega aquí
    try {
      // Cambia esto para que sea una promesa
      const result = await this.cloudinaryService.uploadFile(data);
      return { url: result }; // Asegúrate de devolver la URL de la imagen
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to upload file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
