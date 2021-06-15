import React from 'react'
import TaskCard from './TaskCard'
import {Task} from '../App'

interface TasksProps{
    tasks: Task[],
    onDelete: (id: number) => void
    onToggle: (id:number) => void
}

const Tasks: React.FC<TasksProps> = ({tasks, onDelete, onToggle}) => {

    return (
        <>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Tasks