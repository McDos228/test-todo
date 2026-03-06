import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class AppModule {}
