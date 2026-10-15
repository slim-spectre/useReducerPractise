import {type reducerObject } from "../interfaces/reducerObject"
import { type Action } from "../types/Action"

export const customReducer = (state : reducerObject, action : Action) => {
  switch(action.type){
    case 'added': {
      return {
        ...state,
        todos: [...state.todos, {id : Date.now(), text : action.text, completed : false}],
        inputValue : ""
      }
    }
    case 'changed' : {
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.id ? {...todo, completed : !todo.completed} : todo),
      }
    }
    case 'deleted' : {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      }
    }
    case 'input_set' : {
      return {
        ...state,
        inputValue : action.payload
      }
    }
    case 'clear_completed' : {
      return {
        ...state,
        todos : state.todos.filter(todo => !todo.completed)
      }
    }
    case 'start_edit' : {
      return {
        ...state,
        editingTodoId : action.id
      }
    }
    case 'edit_todo' : {
      return {
        ...state,
        todos : state.todos.map(todo => todo.id === state.editingTodoId ? {...todo, text : action.text} : todo),
        editingTodoId : null,
      }
    }
    default : {
      return state
    }
  }
}