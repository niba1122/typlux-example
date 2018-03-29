import React from "react";
import { lazyInject } from "../inversify.config";
import TodoStore from "../store/TodoStore";
import { Todo } from "../model/Todo";
import Store from "typlux";
import { TodoViewProperty } from "../store/TodoViewProperty";

export default class TodoList extends React.Component<{}, TodoViewProperty> {

  @lazyInject(TodoStore)
  private store!: TodoStore

  constructor(props: {}) {
    super(props)

    this.state = {
      newTodoTitle: "",
      todos: []
    }
  }

  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChangeText} value={this.state.newTodoTitle} />
        <input type="submit" value="add" />
      </form>
      <ul>
        {
          this.state.todos.map((todo) => {
            return <li key={todo.id}>
              <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
              <input type="checkbox" onChange={this.handleCheckBox(todo.id)} checked={todo.done} />
            </li>
          })
        }
      </ul>
    </div>
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.store.actionCreator.submitNewTodo()
  }

  handleChangeText = (event: React.FormEvent<HTMLInputElement>) => {
    this.store.actionCreator.changeNewTodoTitle((event.target as HTMLInputElement).value)
  }

  handleCheckBox(id: number) {
    return (event: React.FormEvent<HTMLInputElement>) => {
      this.store.actionCreator.clickCheckbox(id, (event.target as HTMLInputElement).checked)
    }
  }

  componentDidMount() {
    this.store.subscribeViewProperty((viewProperty) => {
      this.setState(viewProperty)
    })
  }
}