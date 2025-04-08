
import { Controller, Post, Get, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { User } from '../users/schemas/user.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { GetUser } from 'src/users/guards/ get-user.decorator';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user:  UserDocument) {
    return this.tasksService.create(createTaskDto,user._id as string);
  }

  @Get()
  findAll(@GetUser() user:  UserDocument) {
    return this.tasksService.findAll(user._id as string);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user:  UserDocument) {
    return this.tasksService.delete(id, user._id as string);
  }
}
