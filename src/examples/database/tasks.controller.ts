import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

// A small REST CRUD API under /database/tasks
@Controller('database/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Create:  POST /database/tasks  { "title": "Buy milk" }
  @Post()
  create(@Body(new ValidationPipe()) dto: CreateTaskDto) {
    return this.tasksService.create(dto.title);
  }

  // Read all:  GET /database/tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // Read one:  GET /database/tasks/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  // Update:  PATCH /database/tasks/1/done
  @Patch(':id/done')
  markDone(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.markDone(id);
  }

  // Delete:  DELETE /database/tasks/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
