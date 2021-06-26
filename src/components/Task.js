import React from 'react';
import "./Task.css"

let id = 0;

let initialFormState = { title: "", toggled:false }

function Task() {

    const initialState = localStorage.getItem("task")?JSON.parse(localStorage.getItem("task")):[]
    const [taskList, setTaskList] = React.useState(initialState)
    const [form, setForm] = React.useState(initialFormState)

    const handleChange = (event) => {
        const {name, value} = event.target;
        setForm({...form, [name]:value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {id: ++id, ...form}
        setTaskList(taskList.concat(task))
        setForm(initialFormState)
        const strgyTask = JSON.stringify(taskList)
        localStorage.setItem("task", strgyTask)
    }

    const handleDelete = index => {
        localStorage.removeItem("task")
        const taskListCopy = [...taskList]
        const taskIndex = taskListCopy.findIndex(item=> item === index)
        taskListCopy.splice(taskIndex, 1)
        setTaskList(taskListCopy)
    }

    function toggleActive(index) {
        let taskListCopy = [...taskList]
        taskListCopy[index].toggled ? (taskListCopy[index].toggled = false) : (taskListCopy[index].toggled = true)
        setTaskList(taskListCopy)
    }

    function toggleActiveStyles(index) {
        if(taskList[index].toggled) {
            return "task completed"
        } else {
            return "task uncompleted"
        }
    }

    const counter = () => {
        let counter = 0;
        for (let item of taskList) {
            if (!item.toggled) {
                counter++
            }
        }
        return counter
    }

    return(
        <div>
            <h1>Task App</h1>
            <p>You have {counter()} uncompleted and {taskList.length} total tasks</p>
            <div>
                {
                taskList.map((task, index) => {
                    return <div key={index} className={toggleActiveStyles(index)}>
                            <div>
                                <p>{task.title}</p>
                            </div>
                            <div>
                                <button onClick={()=>toggleActive(index)}>Done</button>
                                <button onClick={()=>handleDelete(index)}    >Delete Task</button>
                            </div>
                    </div>
                })
                }
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="title" 
                        value={form.title} 
                        onChange={handleChange} 
                        minLength="1" 
                        required 
                    />
                    <button>Add Task</button>
                </form>
            </div>

        </div>
    )
}
export default Task;
