import { ActionCreator, ImmutableVariable } from "typlux";
import TodoActionType, { DoneTodo, AddTodo, ChangeNewTodoTitle, UndoneTodo } from "./TodoActionType";
import { TodoState } from "./TodoState";
import { Todo } from "../model/Todo";
import { TodoRepository } from "../repository/TodoRepository";

export class TodoActionCreator extends ActionCreator<TodoActionType, TodoState> {
  constructor(
    protected dispatch: (action: TodoActionType) => void,
    protected state: ImmutableVariable<TodoState>,
    private todoRepository: TodoRepository) {
    super()
  }

  changeNewTodoTitle(title: string) {
    this.dispatch(new ChangeNewTodoTitle(title))
  }

  submitNewTodo() {
    let addedTodo = this.todoRepository.addTodo(this.state.value.newTodoTitle)
    this.dispatch(new AddTodo(addedTodo))
  }

  clickCheckbox(id: number, checked: boolean) {
    if (checked) {
      let updatedTodo = this.todoRepository.doneTodo(id)
      this.dispatch(new DoneTodo(updatedTodo))
    } else {
      let updatedTodo = this.todoRepository.undoneTodo(id)
      this.dispatch(new UndoneTodo(updatedTodo))
    }
  }

  clickSetDoneButton(id: number) {
    let todo = this.todoRepository.doneTodo(id)
    this.dispatch(new DoneTodo(todo))
  }
}