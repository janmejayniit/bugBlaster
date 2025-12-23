import { useState } from 'react'
import './App.css'
import './styles.css'
import TicketForm from './components/TicketForm.jsx'

function App() {
  

  return (
    <>
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm />
      </div>
        
    </>
  )
}

export default App
