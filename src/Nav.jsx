import React, { useState, useEffect } from 'react';  
import './Navcss.css';  
import { FaPlus, FaTrash, FaUser, FaSearch, FaEdit, FaBell } from 'react-icons/fa';  

function Nav() {  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [note, setNote] = useState("");   
  const [notes, setNotes] = useState([]);   
  const [editingNote, setEditingNote] = useState(null);  

  const [alarmTime, setAlarmTime] = useState("");  
  const [isAlarmSet, setIsAlarmSet] = useState(false);  

  useEffect(() => {  
    const interval = setInterval(() => {  
      if (isAlarmSet) {  
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  
        if (currentTime === alarmTime) {  
          alert('Alarm ringing!');  
          setIsAlarmSet(false);  
        }  
      }  
    }, 1000);  

    return () => clearInterval(interval);  
  }, [alarmTime, isAlarmSet]);  

  const handleAddClick = () => {  
    setIsModalOpen(true);  
  };  

  const handleCloseModal = () => {  
    setIsModalOpen(false);  
    setEditingNote(null);    
  };  

  const handleNoteChange = (event) => {  
    setNote(event.target.value);  
  };  

  const handleSaveNote = () => {  
    if (note.trim()) {  
      if (editingNote) {  
        setNotes(notes.map((n) => n.id === editingNote.id ? { ...n, text: note } : n));  
        setEditingNote(null);  
      } else {  
        setNotes([...notes, { id: Date.now(), text: note, alarmTime: "", isAlarmSet: false }]);  
      }  
      setNote("");  
      handleCloseModal();  
    }  
  };  

  const handleDeleteNote = (id) => {  
    setNotes(notes.filter((note) => note.id !== id));  
  };  

  const handleEditNote = (note) => {  
    setEditingNote(note);  
    setNote(note.text);  
    setIsModalOpen(true);  
  };  

  const handleDeleteAllNotes = () => {  
    if (window.confirm("Are you sure you want to delete all notes?")) {  
      setNotes([]);  
    }  
  };  

  const handleSetAlarm = (id, time) => {  
    setNotes(notes.map(note =>  
      note.id === id ? { ...note, alarmTime: time, isAlarmSet: true } : note  
    ));  
    alert(`Alarm set for note at ${time}`);  
  };  

  return (  
    <div>  
      <div className="nava">  
        <div className="leftnav">  
          <div className="search">  
            <div className="search-icon">  
              <FaSearch className="icon" />  
            </div>  
            <div className='box'>  
              <input  
                style={{  
                  background: 'transparent',  
                  border: 'none',                   
                  borderBottom: '1px solid rgba(255, 255, 255, 0.5)',  
                }}  
                type="text"  
                placeholder="Remember your goals"  
                className="search-input"  
              />  
            </div>  
          </div>  
        </div>  

        <div className="rightnav">  
          <div className="button">  
            <button className="custom-button" onClick={handleAddClick}>  
              <FaPlus /> Add  
            </button>  
            <button className="custom-button" onClick={handleDeleteAllNotes}>  
              <FaTrash /> All  
            </button>  
            <button className="custom-button"><FaUser /> Profile</button>  
          </div>  
        </div>  
      </div>  

      {isModalOpen && (  
        <div className="modal">  
          <div className="modal-content">  
            <div className="close-btn">  
              <button onClick={handleCloseModal}>X</button>  
            </div>  
            <h2>{editingNote ? 'Edit Your Note' : 'Write Your Note'}</h2>  
            <div className='box'>  
              <div className="note-input">  
                <input  
                    style={{  
                      background: 'transparent',  
                      border: 'none',                     
                      borderBottom: '1px solid rgba(255, 255, 255, 0.5)',   
                      outline: 'none',   
                    }}  
                  type="text"  
                  placeholder="Write your note here..."  
                  value={note}  
                  onChange={handleNoteChange}  
                />  
              </div>  
            </div>  
            <div className="save-btn">  
              <button onClick={handleSaveNote}>  
                {editingNote ? 'Update Note' : 'Save Note'}  
              </button>  
            </div>  
          </div>  
        </div>  
      )}  

      <div className="notes-list-container">  
        <h3>Your Notes</h3>  
        <div className="notes-list">  
          {notes.map((note) => (  
            <li key={note.id} className="note-item">  
              <div className='box'>  
                <input  
                  type="text"  
                  value={note.text}  
                  readOnly={!editingNote || editingNote.id !== note.id}   
                  className="note-text"   
                />  
                <div className="square-popup"> {note.text.split('').map((char, index) => ( <span key={index} style={{ '--angle': Math.random() * 360 }}>{char}</span> ))} </div>
              </div>  
              <div>  
                <button className="edit-btn" onClick={() => handleEditNote(note)}>  
                  <FaEdit /> Edit  
                </button>  
                <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>  
                  <FaTrash /> Delete  
                </button>  
              </div>  

              <div>  
                <input   
                  type="time"   
                  value={note.alarmTime}   
                  onChange={(e) => handleSetAlarm(note.id, e.target.value)}  
                  style={{ marginLeft: '10px' }}  
                />  
                <button   
                  onClick={() => handleSetAlarm(note.id, note.alarmTime)}  
                  style={{ marginLeft: '5px' }}  
                  disabled={note.isAlarmSet}  
                >  
                  <FaBell /> {note.isAlarmSet ? 'Alarm Set' : 'Set Alarm'}  
                </button>  
              </div>  
            </li>  
          ))}  
        </div>  
      </div>  
    </div>  
  );  
}  

export default Nav;
