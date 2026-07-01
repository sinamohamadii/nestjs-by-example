import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamplesModule } from './examples/examples.module';

@Module({
  imports: [ExamplesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
