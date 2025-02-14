import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Task | null> {
    try {
      return await this.prisma.task.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'problem with finding of task';
      throw new NotFoundException(errorMessage);
    }
  }

  async findAll(userId: string): Promise<Task[] | null> {
    try {
      return await this.prisma.task.findMany({ where: { userId: userId } });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'problem with finding of task';
      throw new NotFoundException(errorMessage);
    }
  }

  async create(userId: string, text: string): Promise<Task | null> {
    try {
      return await this.prisma.task.create({ data: { userId, text } });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'problem with creating of task';
      throw new Error(errorMessage);
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'problem with deleting of task';
      throw new Error(errorMessage);
    }
  }

  async updateStatus(task_id: string, status: TaskStatus) {
    try {
      return await this.prisma.task.update({
        where: { id: task_id },
        data: { status: status },
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'problem with deleting of task';
      throw new Error(errorMessage);
    }
  }
}
