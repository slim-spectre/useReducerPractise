import { useReducer } from 'react'
import { customReducer } from '../utils/customReducer'
import { useState } from 'react'

function TodoApp() {
  const [{ todos, inputValue, editingTodoId }, dispatch] = useReducer(customReducer, {
    todos: [],
    inputValue: '',
    editingTodoId: null,
  })
  const [changingValue, setChangingValue] = useState<string>('')

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({
        type: 'added',
        text: inputValue,
      })
    }
  }

  const deleteTodo = (id: number) => {
    dispatch({
      type: 'deleted',
      id: id,
    })
  }

  const toggleTodo = (id: number) => {
    dispatch({
      type: 'changed',
      id: id,
    })
  }

  const handleUpdate = () => {
  if (changingValue.trim()) {
    dispatch({ type: "edit_todo", text: changingValue });
    setChangingValue("");
  }
}

  return (
    <div className="flex flex-col gap-2 p-10 m-5 rounded-xl bg-amber-500">
      <h1>Список завдань</h1>
      <input
        className="bg-amber-950 text-white border-gray-100"
        type="text"
        value={inputValue}
        onChange={(e) => dispatch({ type: 'input_set', payload: e.target.value })}
      />
      <button className="bg-amber-900 rounded-xl p-5 text-white border-none cursor-pointer" onClick={addTodo}>
        Додати завдання
      </button>
      <ul className=" flex flex-col gap-3 justify-center items-center">
        {todos.map((todo) => (
          <li className="flex gap-2 items-center" key={todo.id}>
            {todo.id === editingTodoId ? (
              <>
                <input
                  value={changingValue}
                  onChange={(e) => setChangingValue(e.target.value)}
                  className="bg-amber-950 text-white border-gray-100"
                  type="text"
                />
                <button
                  className="bg-amber-900 rounded-xl p-5 text-white border-none cursor-pointer"
                  onClick={handleUpdate}
                >
                  Зберегти
                </button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                <button
                  className="bg-amber-900 rounded-xl p-5 text-white border-none cursor-pointer"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? 'Скасувати' : 'Виконати'}
                </button>
                <button
                  className="bg-amber-900 rounded-xl p-5 text-white border-none cursor-pointer"
                  onClick={() => {
                    dispatch({ type: 'start_edit', id: todo.id })
                    setChangingValue(todo.text)
                  }}
                >
                  Змінити
                </button>
                <button
                  className="bg-amber-900 rounded-xl p-5 text-white border-none cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Видалити
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button
        className="bg-amber-900 rounded-xl p-5 text-white border-none cursor-pointer"
        onClick={() => dispatch({ type: 'clear_completed' })}
      >
        Clear Completed
      </button>
    </div>
  )
}

export default TodoApp
