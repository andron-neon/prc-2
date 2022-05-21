import React from 'react';
import {FilterValuesType} from "./App";
import styles from "./Todolist.module.css"
import {Button} from "./component/Button";
import {CheckBox} from "./component/CheckBox";
import {FullInput} from "./component/FullInput";


export type PropsType = {
    todolistID: string
    title: string
    list: Array<ArrayType>
    removeList: (todolistID: string, elID: string) => void
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    addTask: (todolistID: string, newTitle: string) => void
    checkBoxChange: (todolistID: string, elID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}
export type ArrayType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    // const [title, setTitle] = useState('')
    // const [error, setError] = useState(false)
    // const addTaskHandler = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(props.todolistID,title.trim())
    //         setTitle("")
    //     } else {
    //         setError(true)
    //     }
    // }
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    //     setError(false)
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         if (title.trim() !== '') {
    //             props.addTask(props.todolistID,title.trim())
    //             setTitle('')
    //
    //         }
    //     }
    // }

    const CheckBoxHandler = (elID: string, isDone: boolean) => {
        props.checkBoxChange(props.todolistID, elID, isDone)
    }
    const changeFilterHandler = (todolistID: string, filterValue: FilterValuesType) => {
        props.changeFilter(todolistID, filterValue)
    }
    const removeListHandler = (elID: string) => props.removeList(props.todolistID, elID)

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTaskHandler = (newTitle: string) => {
       props.addTask(newTitle, props.todolistID)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <FullInput
                //key={props.todolistID}
                callBack={addTaskHandler}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        className={error ? styles.error : ''}*/}
            {/*        value={title}*/}
            {/*        onChange={onChangeHandler}*/}
            {/*        onKeyPress={onKeyPressHandler}/>*/}
            {/*    <button onClick={addTaskHandler}>+</button>*/}
            {/*</div>*/}
            {/*{error && <div className={styles.errorMessage}>Title is required</div>}*/}
            <ul>
                {props.list.map(el => {
                        return (

                            <li key={el.id}>
                                <CheckBox isDone={el.isDone} callBack={
                                    (isDone: boolean) => CheckBoxHandler(el.id, isDone)}/>
                                <span>{el.title}</span>
                                <button onClick={() => removeListHandler(el.id)}>X</button>
                            </li>
                        )
                    }
                )}

            </ul>
            <div>

                <Button name={"all"} callBack={() => changeFilterHandler(props.todolistID, "all")}
                        className={props.filter === "all" ? styles.activeFilter : ''}/>
                <Button name={"active"} callBack={() => changeFilterHandler(props.todolistID, "active")}
                        className={props.filter === "active" ? styles.activeFilter : ''}/>
                <Button name={"completed"} callBack={() => changeFilterHandler(props.todolistID, "completed")}
                        className={props.filter === "completed" ? styles.activeFilter : ''}/>

            </div>
        </div>

    );
};

