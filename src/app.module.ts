import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la aplicación
      envFilePath: '.env', // Define el archivo de entorno que se va a cargar
    }),
  ],
  controllers: [AppController],
  providers: [CloudinaryService],
})
export class AppModule { }
