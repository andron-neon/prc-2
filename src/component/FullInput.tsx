import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../Todolist.module.css";

 export type FullInputPropsType = {
    callBack:(newTitle:string)=> void
}

export const FullInput = (props:FullInputPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)
    const addTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        let newTitle = title.trim()
        if (e.key === "Enter") {
            if (newTitle !== '') {
                props.callBack(newTitle)
                setTitle('')

            }
        }
    }
    return (
        <div>
            <input
                className={error ? styles.error : ''}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
    );
};

