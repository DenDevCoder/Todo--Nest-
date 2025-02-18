import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from 'src/graphql/model/task.model';
import {
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { createTaskDto } from 'src/graphql/dto/create-task.input';
import { UpdateStatusDto } from 'src/graphql/dto/update-task.input';
import { TaskStatus } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { GqlAuthGuard } from 'src/auth/GqlAuth.guard';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  @UseGuards(GqlAuthGuard)
  async getallTask(@Context() context) {
    const user = context.req.user;
    try {
      if (!user.id) {
        throw new ForbiddenException();
      }
      return await this.taskService.findAll(user.id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard)
  async createTask(@Args('data') data: createTaskDto, @Context() context) {
    const user = context.req.user;
    if (!user.id) {
      throw new ForbiddenException();
    }
    const { text } = data;
    return this.taskService.create(user.id, text);
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard)
  async updateStatus(@Args('data') data: UpdateStatusDto) {
    try {
      const { task_id, status } = data;
      return await this.taskService.updateStatus(task_id, status);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Mutation(() => Task)
  async delete(@Args('id') id: string) {
    try {
      return await this.taskService.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
