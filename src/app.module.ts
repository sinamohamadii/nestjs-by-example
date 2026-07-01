import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { 01BasicsModule } from './examples/01-basics/01-basics.module';
import { 02ModulesModule } from './examples/02-modules/02-modules.module';
import { 03DependencyInjectionModule } from './examples/03-dependency-injection/03-dependency-injection.module';
import { 04ConfigModule } from './examples/04-config/04-config.module';
import { 05ValidationModule } from './examples/05-validation/05-validation.module';
import { 06PipesModule } from './examples/06-pipes/06-pipes.module';
import { 07GuardsModule } from './examples/07-guards/07-guards.module';
import { 08InterceptorsModule } from './examples/08-interceptors/08-interceptors.module';
import { 09FiltersModule } from './examples/09-filters/09-filters.module';
import { 10MiddlewareModule } from './examples/10-middleware/10-middleware.module';
import { 11AuthModule } from './examples/11-auth/11-auth.module';
import { 12DatabaseModule } from './examples/12-database/12-database.module';
import { 13UploadModule } from './examples/13-upload/13-upload.module';
import { 14CacheModule } from './examples/14-cache/14-cache.module';
import { 15EventsModule } from './examples/15-events/15-events.module';
import { 16CronModule } from './examples/16-cron/16-cron.module';
import { 17QueuesModule } from './examples/17-queues/17-queues.module';
import { 18WebsocketModule } from './examples/18-websocket/18-websocket.module';
import { 19GraphqlModule } from './examples/19-graphql/19-graphql.module';
import { 20TestingModule } from './examples/20-testing/20-testing.module';
import { 21OpenapiModule } from './examples/21-openapi/21-openapi.module';

@Module({
  imports: [01BasicsModule, 02ModulesModule, 03DependencyInjectionModule, 04ConfigModule, 05ValidationModule, 06PipesModule, 07GuardsModule, 08InterceptorsModule, 09FiltersModule, 10MiddlewareModule, 11AuthModule, 12DatabaseModule, 13UploadModule, 14CacheModule, 15EventsModule, 16CronModule, 17QueuesModule, 18WebsocketModule, 19GraphqlModule, 20TestingModule, 21OpenapiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
