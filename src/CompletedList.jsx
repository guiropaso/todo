import React from 'react'
import ToDo from './ToDo.jsx'

export default function CompletedList({list, toggleFunc, removeToDo}) {

    return (
        list.filter(todo => todo.checked === true).map(item => {
            return <ToDo className="completed" key={item.id} toggleFunc={toggleFunc} item={item} removeToDo={removeToDo}/>
        })
    )
}