import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.service.create(title);
  }

  @Patch(':id')
  toggle(@Param('id') id: string) {
    return this.service.toggle(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
