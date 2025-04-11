
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(dto: CreateTaskDto, userId: string) {
    const task = new this.taskModel({ ...dto, userId });
    return task.save();
  }


  async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: string) {
    return this.taskModel.findOneAndUpdate(
      { _id: taskId, userId },
      updateTaskDto,
      { new: true }
    );
  }
  


  async findAll(userId: string) {
    return this.taskModel.find({ userId });
  }

  async delete(taskId: string, userId: string) {
    return this.taskModel.deleteOne({ _id: taskId, userId });
  }
}
