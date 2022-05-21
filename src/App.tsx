import React, {useState} from 'react';

import './App.css';
import {ArrayType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {FullInput} from "./component/FullInput";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key:string]:Array<TasksStateType>
}
function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'My property111', filter: 'all'},
        {id: todolistID2, title: 'My property222', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'REACT', isDone: true},
                {id: v1(), title: 'REDUX', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: true}
            ],
            [todolistID2]: [
                {id: v1(), title: 'HTML&CSS2', isDone: true},
                {id: v1(), title: 'JS2', isDone: false},
                {id: v1(), title: 'REACT2', isDone: true},
                {id: v1(), title: 'REDUX2', isDone: false},
                {id: v1(), title: 'GraphQL2', isDone: true}
            ]
        }
    )

    // let [propertyList, setPropertyList] = useState<Array<ArrayType>>([
    //     {id: v1(), title: "flat", isDone: true},
    //     {id: v1(), title: "cottage", isDone: true},
    //     {id: v1(), title: "garage", isDone: false},
    //     {id: v1(), title: "country house", isDone: false}
    // ])
    let addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const checkBoxChange = (todolistID: string, elID: string, isDone: boolean) => {

        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === elID ? {...el, isDone} : el)})
    }

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el))
    }

    let removeList = (todolistID: string, elID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== elID)})

    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
    }

    return (
        <div className="App">
            {todolists.map((el) => {

                let objForRender = tasks[el.id]
                if (el.filter === "active") {
                    objForRender = tasks[el.id].filter(el => !el.isDone)
                }
                if (el.filter === "completed") {
                    objForRender = tasks[el.id].filter(el => el.isDone)
                }

                return (
                    <div>
                        <Todolist
                            key={el.id}
                            todolistID={el.id}
                            title={el.title}
                            list={objForRender}
                            removeList={removeList}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            checkBoxChange={checkBoxChange}
                            filter={el.filter}
                            removeTodolist={removeTodolist}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default App;
