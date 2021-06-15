import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTasks from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

export interface Task {
  id: number,
  text: string,
  day: string,
  reminder: boolean,
}

const  App = () => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [tasks, setTasks] = useState<any>([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id: number) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async ({text, day, reminder}: {text: string, day: string, reminder: boolean}) => {
    const id = Math.max.apply(Math, tasks.map(function(o:any) { return o.id; })) + 1

    const res = await fetch('http://localhost:5000/tasks', {method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify({text, day, reminder, id})})
    
    const data = await res.json()

    setTasks([...tasks, data])
  }

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    setTasks(tasks.filter((task:any) => task.id !== id))
  }

  const toggleReminder = async (id: number) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', headers:{'Content-type': 'application/json'}, body: JSON.stringify(updTask),})

    const data = await res.json()

    setTasks(tasks.map((task:any) => task.id === id ? {...task, reminder: data.reminder} : task ))
  }

  return (
    <Router>
      <div className="Container">
        <Header onAdd={() => setShowAddForm(!showAddForm)} showAddForm={showAddForm} />
        
        <Route path='/' exact render={(props:any) => (
          <>
            {showAddForm && <AddTasks onAdd={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : <h3 style={{color:'gray'}} >No tasks to show</h3> }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
