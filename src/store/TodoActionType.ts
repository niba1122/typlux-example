import { Todo } from "../model/Todo";

export default interface TodoActionType { }
export class ChangeNewTodoTitle implements TodoActionType { constructor(public title: string) { } }
export class AddTodo implements TodoActionType { constructor(public addedTodo: Todo) { } }
export class DoneTodo implements TodoActionType { constructor(public updatedTodo: Todo) { } }
export class UndoneTodo implements TodoActionType { constructor(public updatedTodo: Todo) { } }