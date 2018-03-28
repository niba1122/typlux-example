import { Todo } from "../model/Todo";

export default interface TodoActionType { }
export class ChangeNewTodoTitle implements TodoActionType { constructor(public title: string) { } }
export class AddTodo implements TodoActionType { constructor(public todo: Todo) { } }
export class SetDoneTodo implements TodoActionType { constructor(public todo: Todo) { } }
export class SetUndoneTodo implements TodoActionType { constructor(public todo: Todo) { } }