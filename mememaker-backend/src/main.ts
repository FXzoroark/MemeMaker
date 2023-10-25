import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import{
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig, SwaggerConfig } from './app.types'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MemesModule } from './memes/memes.module';
import {contentParser} from 'fastify-multer';
import helmet from '@fastify/helmet'
import { join } from 'path';
import { FilesModule } from './files/files.module';



async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true}),
  );


  app.enableCors({
      origin: config.cors,
      methods: ["GET", "PUT", "POST", "DELETE"],
      exposedHeaders: ["X-Requested-With"],
      credentials: true,
    });
    
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  //needed because FastifyAdapter is not compatible withe Swagger and contentParser for upload file
  app.register(helmet, {
    contentSecurityPolicy:{
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    }
  });
  app.register(contentParser)
  app.useStaticAssets({root: join(__dirname, "../../mememaker-backend/upload")})

  const option = new DocumentBuilder()
  .setTitle(swaggerConfig.title)
  .setDescription(swaggerConfig.description)
  .setVersion(swaggerConfig.version)
  .addTag(swaggerConfig.tag)
  .build();

  const memesDoc = SwaggerModule.createDocument(app, option, {
    include: [MemesModule, FilesModule],
  });

  SwaggerModule.setup(swaggerConfig.path, app, memesDoc);


  // launch server
  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap'
    );
}

bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger')
);
