import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
import axiosRetry from 'axios-retry';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
      return (
        axiosRetry.isNetworkError(error) ||
        (error.response && error.response.status === 429)
      );
    },
  });

  await app.listen(3000);
}
bootstrap();
