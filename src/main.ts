import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Windows Explorer API')
      .setDescription('API Documentation for Windows Explorer')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/', app, document);
  }

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
