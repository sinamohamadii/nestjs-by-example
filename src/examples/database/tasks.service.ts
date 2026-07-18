import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  // The repository is TypeORM's tool for reading and writing this entity's table.
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  // INSERT a new row.
  create(title: string) {
    const task = this.tasksRepository.create({ title });
    return this.tasksRepository.save(task);
  }

  // SELECT every row.
  findAll() {
    return this.tasksRepository.find();
  }

  // SELECT one row by id, or 404 if it doesn't exist.
  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  // UPDATE a row, then return the fresh version.
  async markDone(id: number) {
    const task = await this.findOne(id);
    task.done = true;
    return this.tasksRepository.save(task);
  }

  // DELETE a row.
  async remove(id: number) {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
    return { deleted: true, id };
  }
}
