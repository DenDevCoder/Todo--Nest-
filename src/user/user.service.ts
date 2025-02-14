import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserExist(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (user) {
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<User | null> {
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

  async create(
    userId: string,
    email: string,
    name: string,
    password: string,
  ): Promise<User | null> {
    try {
      return await this.prisma.user.create({
        data: { id: userId, email, name, password },
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'problem with creating of user';
      return null;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error: any) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'problem with deleting of user';
      throw new Error(errorMessage);
    }
  }
}
