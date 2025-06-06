
import { Controller, Post, Get, Body, Delete, Param, UseGuards, Patch, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { UserDocument } from '../users/schemas/user.schema';
import { GetUser } from 'src/users/guards/ get-user.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';


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

  @Put(':id')
update(
  @Param('id') id: string,
  @Body() updateTaskDto: UpdateTaskDto,
  @GetUser() user: UserDocument,
) {
  return this.tasksService.update(id, updateTaskDto, user._id as string);
}

@Patch(':id/status')
updateCompleted(@Param('id') id: string, @Body('completed') completed: boolean) {
  return this.tasksService.updateCompleted(id, completed);
}



  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user:  UserDocument) {
    return this.tasksService.delete(id, user._id as string);
  }
}
