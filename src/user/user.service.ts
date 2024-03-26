import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      const results = [];
      users.forEach((user) => {
        delete user.hash;
        results.push(user);
      });
      return { results };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException(`user with id ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
}
