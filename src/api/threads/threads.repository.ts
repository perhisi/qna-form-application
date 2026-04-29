import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ThreadsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content?: string; userId?: number }) {
    const userId = data.userId ?? 1;
    return this.prisma.thread.create({
      data: {
        title: data.title,
        content: data.content ?? null,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.thread.findMany();
  }

  async findOne(id: number) {
    return this.prisma.thread.findUnique({ where: { id } });
  }

  async update(id: number, data: { title?: string; content?: string }) {
    return this.prisma.thread.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.thread.delete({ where: { id } });
  }
}
