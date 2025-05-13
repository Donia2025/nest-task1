import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo, TodoDocument } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
  ) {}

  findAll() {
    return this.todoModel.find();
  }

  findOne(id: Types.ObjectId) {
    return this.todoModel.findById(id);
  }

  create(createDto: CreateTodoDto) {
    const created = new this.todoModel(createDto);
    return created.save();
  }

  update(id: Types.ObjectId, updateDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

remove(id: Types.ObjectId): Promise<{ message: string }> {
  return this.todoModel.findByIdAndDelete(id).exec().then(result => {
    if (!result) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return { message: `Todo with ID ${id.toString()} deleted successfully` };
  });
}
}
