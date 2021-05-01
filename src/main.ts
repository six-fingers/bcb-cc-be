import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new Logger()
    });

    app.enableCors({ origin: 'http://localhost:4200' })
    await app.listen(3000);
}
bootstrap();
