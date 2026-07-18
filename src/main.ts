import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- OpenAPI (Swagger) setup — see src/examples/openapi ---
  // Describe the API, then generate and serve interactive docs at /docs.
  const config = new DocumentBuilder()
    .setTitle('NestJS by Example')
    .setDescription('Interactive API documentation generated from the code.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // UI at /docs, JSON at /docs-json

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
