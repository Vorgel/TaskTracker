import Button from './Button'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
    onAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    showAddForm: boolean
}

const Header: React.FC<HeaderProps> = ({onAdd, showAddForm}) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            {location.pathname === '/' && <Button color={showAddForm ? 'darkgreen' : 'green'} text={showAddForm ? 'Close' : 'Add'} onClick={onAdd} />}
        </header>
    )
}

export default Header