import { Todo } from "../model/Todo";

export interface TodoState {
  newTodoTitle: string
  todos: Todo[]
}