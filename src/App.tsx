import React, {useState} from 'react';

import './App.css';
import {ArrayType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'My property111', filter: 'all'},
        {id: v1(), title: 'My property222', filter: 'all'}
    ])

    let [propertyList, setPropertyList] = useState<Array<ArrayType>>([
        {id: v1(), title: "flat", isDone: true},
        {id: v1(), title: "cottage", isDone: true},
        {id: v1(), title: "garage", isDone: false},
        {id: v1(), title: "country house", isDone: false}
    ])
    const addTask = (newTitle: string) => {
        setPropertyList([{id: v1(), title: newTitle, isDone: false}, ...propertyList])
    }
    //const [filter, setFilter] = useState<FilterValuesType>("all")

    const checkBoxChange = (elID: string, checkedValue: boolean) => {
        setPropertyList(propertyList.map(el => el.id === elID ? {...el, isDone: checkedValue} : el))
    }

    const changeFilter = (todolistID:string,filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el,filter} : el))
    }

    let removeList = (elID: string) => {
        setPropertyList(propertyList.filter(el => el.id !== elID))
    }
    // let objForRender = propertyList
    // if (filter === "active") {
    //     objForRender = propertyList.filter(el => !el.isDone)
    // }
    // if (filter === "completed") {
    //     objForRender = propertyList.filter(el => el.isDone)
    // }


    return (
        <div className="App">
            {todolists.map((el) => {

                let objForRender = propertyList
                if (el.filter === "active") {
                    objForRender = propertyList.filter(el => !el.isDone)
                }
                if (el.filter === "completed") {
                    objForRender = propertyList.filter(el => el.isDone)
                }

                return (
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
                    />
                )
            })}
        </div>
    );
}

export default App;
