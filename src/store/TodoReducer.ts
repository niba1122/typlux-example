import { TodoState } from "./TodoState";
import TodoActionType, { SetDoneTodo, AddTodo, ChangeNewTodoTitle, SetUndoneTodo } from "./TodoActionType";

const todoReducer: (action: TodoActionType, state: TodoState) => TodoState =
  (action: TodoActionType, state: TodoState) => {
    if (action instanceof ChangeNewTodoTitle) {
      return {
        ...state,
        newTodoTitle: action.title
      }
    } else if (action instanceof SetDoneTodo || action instanceof SetUndoneTodo) {
      return {
        ...state,
        todos: state.todos.map((todo) => action.todo.id == todo.id ? action.todo : todo)
      }
    } else if (action instanceof AddTodo) {
      return {
        ...state,
        newTodoTitle: '',
        todos: [action.todo, ...state.todos]
      }
    }
    return state
  }

export default todoReducer