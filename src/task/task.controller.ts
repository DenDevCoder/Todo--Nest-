import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { createTaskDto, UpdateStatusDto } from './interface/dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getallTask(@Req() req: Request): Promise<Task[] | null> {
    try {
      if (!req.user) {
        throw new ForbiddenException();
      }
      return await this.taskService.findAll(req.user.id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async create(
    @Body() body: createTaskDto,
    @Req() req: Request,
  ): Promise<Task | null> {
    try {
      if (!req.user) {
        throw new ForbiddenException();
      }
      const { text } = body;
      return await this.taskService.create(req.user.id, text);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    try {
      return await this.taskService.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
