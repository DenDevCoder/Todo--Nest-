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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all tasks' })
  @ApiResponse({ status: 200, description: 'list of tasks' })
  @ApiResponse({ status: 500, description: 'server error' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create new task' })
  @ApiBody({ type: createTaskDto })
  @ApiResponse({ status: 201, description: 'task was created' })
  @ApiResponse({ status: 400, description: 'bad request' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update status of task' })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({ status: 200, description: 'status was updated' })
  @ApiResponse({ status: 400, description: 'bad request' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete task' })
  @ApiResponse({ status: 200, description: 'task was deleted' })
  @ApiResponse({ status: 400, description: 'bad request' })
  @ApiResponse({ status: 500, description: 'server error' })
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    try {
      return await this.taskService.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
