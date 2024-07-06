import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api') // nomally we have APIs -> "/employees" or "/users" | 
  // after using -- setGloabalPrefix("api") -- -> "api/employee" or "api/users"

  app.enableCors() // everyone can access our site
  await app.listen(3000);
}
bootstrap();
