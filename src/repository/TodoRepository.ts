import { injectable } from 'inversify';
import { Todo } from '../model/Todo';

let currentTodoID = 0
let todos: Todo[] = []

@injectable()
export class TodoRepository {
  getTodos(): Todo[] {
    return todos
  }

  addTodo(title: string): Todo {
    currentTodoID++
    let newTodo = new Todo(currentTodoID, title, false)
    todos.push(newTodo)
    return newTodo
  }

  doneTodo(id: number): Todo {
    let index = todos.findIndex((todo) => {
      return todo.id == id
    })
    if (index == -1) {
      throw ("unknown id")
    }

    let newTodo = new Todo(todos[index].id, todos[index].title, true)
    todos.splice(index, 1, newTodo)
    return newTodo
  }

  undoneTodo(id: number): Todo {
    let index = todos.findIndex((todo) => {
      return todo.id == id
    })
    if (index == -1) {
      throw("unknown id")
    }

    let newTodo = new Todo(todos[index].id, todos[index].title, false)
    todos.splice(index, 1, newTodo)
    return newTodo
  }
}