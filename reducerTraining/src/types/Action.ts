export type Action =
  | {type : 'added', text : string}
  | {type : 'changed', id : number}
  | {type : 'deleted', id : number}
  | {type : 'input_set', payload : string}
  | {type : 'clear_completed'}
  | {type : 'edit_todo', text : string}
  | {type : 'start_edit', id : number}
