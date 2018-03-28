import { Container, decorate, injectable } from "inversify";
import getDecorators from "inversify-inject-decorators";

import Store from "typlux";
import TodoStore from "./store/TodoStore";
import { TodoRepository } from "./repository/TodoRepository";

const container = new Container()

decorate(injectable(), Store)
container.bind(TodoRepository).toSelf()
container.bind(TodoStore).toSelf().inSingletonScope()

let { lazyInject } = getDecorators(container);

export { container, lazyInject }