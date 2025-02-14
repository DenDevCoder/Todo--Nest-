import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<Task | null> {
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

  async findAll(userId: number): Promise<Task[] | null> {
    try {
      return await this.prisma.task.findMany({ where: { userId } });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'problem with finding of task';
      throw new NotFoundException(errorMessage);
    }
  }

  async create(userId: number, text: string): Promise<Task | null> {
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

  async delete(id: number) {
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

  async updateStatus(task_id: number, status: TaskStatus) {
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
