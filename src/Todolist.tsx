import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from "./Todolist.module.css"
import {Button} from "./component/Button";
import {CheckBox} from "./component/CheckBox";


export type PropsType = {
    todolistID:string
    title: string
    list: Array<ArrayType>
    removeList: (elID: string) => void
    changeFilter: (todolistID:string,filter: FilterValuesType) => void
    addTask: (newTitle: string) => void
    checkBoxChange: (elID: string, checkedValue: boolean) => void
    filter: FilterValuesType
}
export type ArrayType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (title.trim() !== '') {
                props.addTask(title.trim())
                setTitle('')

            }
        }
    }

    const CheckBoxHandler = (elID: string, checkedValue: boolean) => {
        props.checkBoxChange(elID,checkedValue )
    }
    const changeFilterHandler = (todolistID:string,filterValue: FilterValuesType) => {
        props.changeFilter(todolistID,filterValue)
    }
    const removeListHandler = (elID:string) => props.removeList(elID)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? styles.error : ''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {error && <div className={styles.errorMessage}>Title is required</div>}
            <ul>
                {props.list.map(el => {
                    return (

                            <li key={el.id}>
                                <CheckBox isDone={el.isDone} callBack={(checkedValue: boolean)=>CheckBoxHandler(el.id, checkedValue)}/>
                                <span>{el.title}</span>
                                <button onClick={()=>removeListHandler(el.id)}>X</button>
                            </li>
                        )
                    }
                )}

            </ul>
            <div>

                <Button name={"all"} callBack={() => changeFilterHandler(props.todolistID,"all")}
                        className={props.filter === "all" ? styles.activeFilter : ''}/>
                <Button name={"active"} callBack={() => changeFilterHandler(props.todolistID,"active")}
                        className={props.filter === "active" ? styles.activeFilter : ''}/>
                <Button name={"completed"} callBack={() => changeFilterHandler(props.todolistID,"completed")}
                        className={props.filter === "completed" ? styles.activeFilter : ''}/>

            </div>
        </div>

    );
};

