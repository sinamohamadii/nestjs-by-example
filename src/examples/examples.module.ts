import { Module } from '@nestjs/common';
import { BasicsModule } from './basics/basics.module';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from './config/config.module';
import { ValidationModule } from './validation/validation.module';
import { PipesModule } from './pipes/pipes.module';
import { GuardsModule } from './guards/guards.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { FiltersModule } from './filters/filters.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { CacheModule } from './cache/cache.module';
import { EventsModule } from './events/events.module';
import { CronModule } from './cron/cron.module';
import { QueuesModule } from './queues/queues.module';
import { WebsocketModule } from './websocket/websocket.module';
import { GraphqlModule } from './graphql/graphql.module';
import { TestingModule } from './testing/testing.module';
import { OpenapiModule } from './openapi/openapi.module';
import { DependencyInjectionModule } from './dependency-injection/dependency-injection.module';

@Module({
  imports: [
    BasicsModule,
    ModulesModule,
    DependencyInjectionModule,
    ConfigModule,
    ValidationModule,
    PipesModule,
    GuardsModule,
    InterceptorsModule,
    FiltersModule,
    MiddlewareModule,
    AuthenticationModule,
    AuthorizationModule,
    DatabaseModule,
    UploadModule,
    CacheModule,
    EventsModule,
    CronModule,
    QueuesModule,
    WebsocketModule,
    GraphqlModule,
    TestingModule,
    OpenapiModule,
  ],
})
export class ExamplesModule {}
