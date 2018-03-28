import { TodoState } from "./TodoState";
import { TodoViewProperty } from "./TodoViewProperty";

const todoGetter: (state: TodoState) => TodoViewProperty = (state: TodoState) => {
  return {
    newTodoTitle: state.newTodoTitle,
    todos: state.todos
  }
}

export default todoGetter