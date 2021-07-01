import { useState } from 'react';
import './cardForm.css';

const CardForm = ({ createNewCard }) => {
    const [message, setMessage] = useState('');
    const [stickyNoteColor, setStickyNoteColor] = useState('yellow');

    const handleMessageChange = (e) => { setMessage(e.target.value) };

    const submitNewCard = (e) => {
        e.preventDefault();
        createNewCard(message, stickyNoteColor);
        setMessage('');
    };

    const handleCardColorChange = (e) => {
        setStickyNoteColor(e.target.value);
    }

    return (
        <div>
            <h2>Create a New Card</h2>
            <form onSubmit={submitNewCard} className='new-card-form'>
                <label>Message</label>
                <input 
                    type='text'
                    value={message}
                    onChange={handleMessageChange} 
                    placeholder='Add a message'
                />
                <p>Preview: {message} </p>
                <p>Select a sticky note color:</p>
                <select onChange={handleCardColorChange}>
                    <option value="yellow">Yellow</option>
                    <option value="pink">Pink</option>
                    <option value="card-blue">Blue</option>
                    <option value="card-green">Green</option>
                </select>
                <input type="Submit"
                disabled={message.length === 0 || message.length > 40}
                />
            </form>
        </div>
    )
}

export default CardForm;