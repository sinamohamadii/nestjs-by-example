import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    // Connect to the database. We use "sqljs" — an in-memory SQLite that needs
    // no server and no native build, which is perfect for a self-contained example.
    // In production you would use "postgres" or "mysql" with real credentials.
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: false,
      entities: [Task],
      // synchronize creates tables automatically from your entities.
      // Great for demos; use migrations instead in production.
      synchronize: true,
    }),
    // Make the Task repository injectable inside this module.
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class DatabaseModule {}
