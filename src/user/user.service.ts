import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'problem with finding user';
      throw new NotFoundException(errorMessage);
    }
  }

  async findAll(): Promise<User[] | null> {
    try {
      return await this.prisma.user.findMany();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'problem with finding users';
      throw new NotFoundException(errorMessage);
    }
  }

  async create(email: string, name: string): Promise<User | null> {
    try {
      return await this.prisma.user.create({ data: { email, name } });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'problem with creating of user';
      return null;
    }
  }
}
