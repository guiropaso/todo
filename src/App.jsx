import React, {useState, useRef, useEffect} from 'react'
import ToDoList from './ToDoList.jsx'
import CompletedList from './CompletedList.jsx'
import {nanoid} from 'nanoid'

export default function App() {
  const [arrayToDos, setArrayToDos] = useState([])
  const [edit, setEdit] = useState([])
  const inputRef = useRef()
  const editRef = useRef()
  
  useEffect(() => {
    if(editRef.current == undefined){
      return
    }
    editRef.current.focus()
  })

    function addToDo(){
      if(inputRef.current.value === "" || /^\s*$/.test(inputRef.current.value)) return
      setArrayToDos(prevArray => [...prevArray, {task: inputRef.current.value, checked: false, id: nanoid()}])
      inputRef.current.focus()
    }

    useEffect(() => {
      inputRef.current.value = ""
    },[arrayToDos])

    function startEdit(item) {
      setEdit([item])
      document.getElementById("input-form").style.display = "none"
    }

    function toggleFunc(id) {
      const newTodos = [...arrayToDos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.checked = !todo.checked
      setArrayToDos(newTodos)
    }

    function handleSubmit(e){
      e.preventDefault()
    }
    
    function endEdit(e) {
      e.preventDefault()
      document.getElementById("input-form").style.display = "block"
      setArrayToDos(prevArrayToDos => prevArrayToDos.map(todo => todo.id === edit[0].id ? {...todo, task: editRef.current.value} : todo))
      setEdit([])
    }

    function removeToDo(id) {
      const removeArr = arrayToDos.filter(item => item.id !== id)
      setArrayToDos(removeArr)
    }

  return (
    <div id="app-div">
      <form onSubmit={handleSubmit} id="input-form">
        <div className="input-form-div">
          <input ref={inputRef} className="todo-input" type="text" placeholder="Ingresa una tarea..." disabled = {edit.length === 1 && true}/>
          <button onClick={addToDo} className="todo-button" type="submit" disabled = {edit.length === 1 && true}>AGREGAR</button>
        </div>
      </form>
      { edit.length === 0 && <div id="wrapper">
        {arrayToDos.some(todo => todo.checked === false) && <h3>Pending</h3>}
        <ToDoList list={arrayToDos} toggleFunc={toggleFunc} removeToDo={removeToDo} startEdit={startEdit}/>
        {arrayToDos.some(todo => todo.checked === true) &&
        <div>
          <h3>Completed</h3>
          <div id="completed-wrapper">
            <CompletedList list={arrayToDos} toggleFunc={toggleFunc} removeToDo={removeToDo}/>
          </div>
        </div>}
      </div>}
      {edit.length === 1 && <div>
        <form id="edit-form" onSubmit={endEdit}>
          <input type="text" ref={editRef} defaultValue={edit[0].task}/>
          <button type="submit" onClick={endEdit}>Update</button>
        </form>
      </div>}
    </div>
  )
}
