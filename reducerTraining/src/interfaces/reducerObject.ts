import type { Todo } from "./Todo"


export interface reducerObject {
  todos : Todo[],
  inputValue : string,
  editingTodoId : number | null,
}