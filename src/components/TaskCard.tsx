import React from 'react'
import {FaTimes} from 'react-icons/fa'
import {Task} from '../App'

interface TasksProps{
    task: Task,
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

const TaskCard: React.FC<TasksProps> = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color:'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} /></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default TaskCard
