import React, {useState} from 'react';

export default function TicketForm(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');

    const priorityLabels = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    }

    const clearForm = () =>{
        setTitle('');
        setDescription('');
        setPriority('1');
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const ticketData = {
            id: new Date().toISOString(),
            title,
            description,
            priority
        };
        console.log('Ticket Submitted:', ticketData);
        clearForm();
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="ticket-form">
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />  
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <fieldset className='priority-fieldset'>
                    <legend>Priority</legend>
                    {Object.entries(priorityLabels).map(([key, label]) => (
                        <div key={key}>
                            <label htmlFor={`priority-${key}`} className='priority-label'>
                            <input
                                type="radio"
                                id={`priority-${key}`}
                                name="priority"
                                value={key}
                                checked={priority === key}
                                onChange={(e) => setPriority(e.target.value)}
                            />
                            {label}
                            </label>
                        </div>
                    ))}
                </fieldset>                
                <button type="submit" className="button">Submit Ticket</button>
            </form>
        </>
    )

}