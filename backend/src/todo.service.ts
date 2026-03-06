import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(title: string) {
    return this.prisma.todo.create({
      data: { title },
    });
  }

  toggle(id: number) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed: true },
    });
  }

  delete(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
