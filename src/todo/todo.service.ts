import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  private freeIds: number[] = [];

  create(createTodoDto: CreateTodoDto): Todo {
    const id = this.freeIds.length > 0
      ? this.freeIds.shift()!
      : this.idCounter++;

    const newTodo: Todo = {
      id,
      title: createTodoDto.title,
      description: createTodoDto.description || '',
      isCompleted: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo | undefined {
    const todo = this.findOne(id);
    if (!todo) {
      return undefined;
    }
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: number): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return false;
    }

    this.freeIds.push(id);

    this.todos.splice(index, 1);
    return true;
  }
}
