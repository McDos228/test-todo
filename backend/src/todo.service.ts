import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TodoService {
  findAll() {
    return prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(title: string) {
    return prisma.todo.create({
      data: { title },
    });
  }

  toggle(id: number) {
    return prisma.todo.update({
      where: { id },
      data: { completed: { not: true } },
    });
  }

  delete(id: number) {
    return prisma.todo.delete({
      where: { id },
    });
  }
}