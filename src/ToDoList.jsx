import React from 'react'
import ToDo from './ToDo.jsx'

export default function ToDoList({list, toggleFunc, removeToDo, startEdit}) {

    return (
        list.filter(todo => todo.checked === false).map(item => {
            return <ToDo key={item.id} toggleFunc={toggleFunc} item={item} removeToDo={removeToDo} startEdit={startEdit}/>
        })
    )
}