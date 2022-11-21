import React from 'react'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'

export default function ToDo({item, toggleFunc, removeToDo, startEdit}) {

    function handleToDoClick() {
        toggleFunc(item.id)
    }

    function remove() {
        removeToDo(item.id)
    }

    function edit() {
        startEdit(item)
    }

    return (
        <div className="todo-item-div">
            <div className="div-label">
                <input type="checkbox" id={item.key} checked={item.checked} onChange={handleToDoClick}/>
                <label htmlFor={item.key} onClick={handleToDoClick}>
                    {item.task}
                </label>
            </div>
            <div className="div-icons">
                <RiCloseCircleLine onClick={remove} className="icono"/>
                { item.checked === false && <TiEdit className="icono" onClick={edit}/>}
            </div>
        </div>
    )
}