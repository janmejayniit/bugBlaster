import React, {useState, useEffect} from 'react';

export default function TicketForm({dispatch, editingTicket}){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState("1");

    useEffect(() => {
        if(editingTicket){
            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority.toString());
        }
    },[editingTicket]);

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
            id: editingTicket?editingTicket.id:new Date().toISOString(),
            title,
            description,
            priority
        };
        console.log('Ticket Submitted:', ticketData);
        dispatch({type: editingTicket? "UPDATE_TICKET": "ADD_TICKET", payload: ticketData});
        clearForm();
    }

    const handleCancel = () => {
        dispatch({ type: "CLEAR_EDITING_TICKET" });
        clearForm();
    };

    return(
        <>
            <form onSubmit={handleSubmit} className="ticket-form">
                <div>
                    <label>Title</label>
                    <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} />  
                </div>
                <div>
                    <label>Description</label>
                    <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <fieldset className='priority-fieldset'>
                    <legend>Priority</legend>
                    {Object.entries(priorityLabels).map(([key, label]) => (
                        <div key={key}>
                            <label htmlFor={`priority-${key}`} className='priority-label'>
                            <input
                                type="radio"
                                id={`priority-${key}`}
                                className="priority-input"
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
                 {editingTicket && (
                        <button className="button" onClick={handleCancel}>
                        Cancel Edit
                        </button>
                    )}
            </form>
        </>
    )

}