import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { createTaskDto, UpdateStatusDto } from './interface/dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async getallTask(
    @Param(new ParseIntPipe()) id: number,
  ): Promise<Task[] | null> {
    try {
      return await this.taskService.findAll(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: createTaskDto): Promise<Task | null> {
    try {
      const { userId, text } = body;
      return await this.taskService.create(userId, text);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    try {
      const { task_id, status } = updateStatusDto;
      return await this.taskService.updateStatus(task_id, status);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param(new ValidationPipe()) id: number) {
    try {
      return await this.taskService.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
