import Store, { ImmutableVariable } from "typlux";
import { TodoActionCreator } from "./TodoActionCreator";
import TodoActionType from "./TodoActionType";
import { TodoState } from "./TodoState";
import { TodoViewProperty } from "./TodoViewProperty";
import todoReducer from "./TodoReducer";
import todoGetter from "./TodoGetter";
import { TodoRepository } from "../repository/TodoRepository";
import { injectable } from "inversify";

@injectable()
export default class TodoStore extends Store<TodoActionCreator, TodoActionType, TodoState, TodoViewProperty> {
  constructor(private todoRepository: TodoRepository) {
    super()
  }

  protected provideActionCreator(dispatch: (action: TodoActionType) => void, state: ImmutableVariable<TodoState>): TodoActionCreator {
    return new TodoActionCreator(dispatch, state, this.todoRepository)
  }
  protected provideReducer(): (action: TodoActionType, state: TodoState) => TodoState {
    return todoReducer
  }
  protected provideGetter(): (state: TodoState) => TodoViewProperty {
    return todoGetter
  }
  protected provideInitialState(): TodoState {
    return {
      newTodoTitle: "",
      todos: []
    }
  }
}