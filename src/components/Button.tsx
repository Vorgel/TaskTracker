import React from 'react'

interface ButtonProps {
    color?: string
    text: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({color, text, onClick}) => {
    
    return (
    <button className='btn' onClick={onClick} style={{backgroundColor: color}}>
        {text}
    </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

export default Button
