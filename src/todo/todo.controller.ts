import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from '../pipes/validate-object-id.pipe';

@Controller('todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateObjectIdPipe) id: Types.ObjectId,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId) {
    return this.todosService.remove(id);
  }
}
