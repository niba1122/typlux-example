import { TodoState } from "./TodoState";
import TodoActionType, { DoneTodo, AddTodo, ChangeNewTodoTitle, UndoneTodo } from "./TodoActionType";

const todoReducer: (action: TodoActionType, state: TodoState) => TodoState =
  (action: TodoActionType, state: TodoState) => {
    if (action instanceof ChangeNewTodoTitle) {
      return {
        ...state,
        newTodoTitle: action.title
      }
    } else if (action instanceof DoneTodo || action instanceof UndoneTodo) {
      return {
        ...state,
        todos: state.todos.map((todo) => action.updatedTodo.id == todo.id ? action.updatedTodo : todo)
      }
    } else if (action instanceof AddTodo) {
      return {
        ...state,
        newTodoTitle: '',
        todos: [action.addedTodo, ...state.todos]
      }
    }
    return state
  }

export default todoReducer