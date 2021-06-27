import React from 'react';
import "./Task.css";
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction,  IconButton } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete';
import DoneOutline from '@material-ui/icons/DoneOutline';


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
        <div className="title">
            <Typography variant='h2' align='center' gutterBottom>📝 Task App</Typography>
            <Typography variant='h5' align='center' gutterBottom>You have {counter()} uncompleted and {taskList.length} total tasks</Typography>
            <div>
                {
                    taskList.map((task, index)=>{
                        return <List key={index} className={toggleActiveStyles(index)}> 
                            <p>{task.title}</p>
                            <div>
                                <IconButton><Button variant="contained" color="primary" onClick={()=> toggleActive(index)}><DoneOutline/></Button></IconButton>
                                <IconButton><Button variant="contained" color="primary" onClick={()=>handleDelete(task.id)}><Delete/></Button></IconButton>
                            </div>
                        </List>
                    })
                }
            </div>

            <div>
                <Paper>
                <form onSubmit={handleSubmit}>
                <TextField>
                    <input 
                        type="text"
                        name="title" 
                        value={form.title} 
                        onChange={handleChange} 
                        minLength="1" 
                        required 
                    />
                </TextField>
                    <Button variant="contained" color="primary">Add Task</Button>
                </form>
                </Paper>
            </div>

        </div>
    )
}
export default Task;
