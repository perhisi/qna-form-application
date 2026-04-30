import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Forum Apllication')
    .setDescription('API Documentation for Forum Application')
    .setVersion('1.0')
    .addTag('User and Thread Management')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JwtAuthGuard', // 🔑 This name must match the @ApiBearerAuth decorator
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { // Access at http://localhost:3000/api
    swaggerOptions: {
      persistAuthorization: true, // Retains the token after refresh
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
