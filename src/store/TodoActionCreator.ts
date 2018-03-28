import { ActionCreator, ImmutableVariable } from "typlux";
import TodoActionType, { SetDoneTodo, AddTodo, ChangeNewTodoTitle, SetUndoneTodo } from "./TodoActionType";
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
    let todo = this.todoRepository.addTodo(this.state.value.newTodoTitle)
    this.dispatch(new AddTodo(todo))
  }

  clickCheckbox(id: number, checked: boolean) {
    if (checked) {
      let todo = this.todoRepository.doneTodo(id)
      this.dispatch(new SetDoneTodo(todo))
    } else {
      let todo = this.todoRepository.undoneTodo(id)
      this.dispatch(new SetUndoneTodo(todo))
    }
  }

  clickSetDoneButton(id: number) {
    let todo = this.todoRepository.doneTodo(id)
    this.dispatch(new SetDoneTodo(todo))
  }
}