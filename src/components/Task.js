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
        let updatedTaskList = taskList.concat(task)
        setTaskList(updatedTaskList)
        setForm(initialFormState)
        localStorage.setItem("task", JSON.stringify(updatedTaskList))
    }

    const handleDelete = id => {
        localStorage.removeItem("task")
        let removedTaskList = [...taskList.filter(item => item.id !== id)]
        setTaskList(removedTaskList)
        localStorage.setItem("task", JSON.stringify(removedTaskList))
    }

    function toggleActive(index) {
        let taskListCopy = [...taskList]
        taskListCopy[index].toggled ? (taskListCopy[index].toggled = false) : (taskListCopy[index].toggled = true)
        setTaskList(taskListCopy)
        localStorage.setItem("task", JSON.stringify(taskListCopy))

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
    console.log("tasklist", taskList)
    console.log("tasklist", taskList.length)
    return(
        <div>
            <h1>Task App</h1>
            <p>You have {counter()} uncompleted and {taskList.length} total tasks</p>
            <div>
                {
                    taskList.map((task, index)=>{
                        return <div key={index} className={toggleActiveStyles(index)}> 
                            <p>{task.title}</p>
                            <div>
                                <button onClick={()=> toggleActive(index)}>Done</button>
                                <button onClick={()=>handleDelete(task.id)}>Delete Task</button>
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
