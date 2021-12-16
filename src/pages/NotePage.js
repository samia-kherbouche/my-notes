import React,{useState,useEffect} from 'react'
// import notes from '../assets/data'
import {useParams} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

import {Link} from 'react-router-dom';
function NotePage(props) {
    
    const {id} = useParams()
    console.log(id+" props")
    const [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async () => {
        if(id === 'new') return
        let response=await fetch(`http://127.0.0.1:5000/notes/${id}`)
        let data = await response.json()
        setNote(data)

    }

    let createNote = async ()=>{
        await fetch(`http://127.0.0.1:5000/notes/`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...note,'updated':new Date()}),
        })
    }

    let updateNote = async ()=>{
        await fetch(`http://127.0.0.1:5000/notes/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...note,'updated':new Date()}),
        })
    }
    // let note=notes.find(note => note.id == id)
    // console.log(note)

    let navigate = useNavigate();
    
    let handleSubmit = ()=>{
        if (id !== 'new' && !note.body) {
            DeleteNote()
        }else if (id !== 'new'){
            updateNote()
        }else if(id == 'new' && note !== null){
            createNote()
        }
        
        navigate('/');
    }
    
    let DeleteNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/${id}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note),
        })
        navigate('/')
    }
    return (
        <div className="note">
            <div className="note-header">
            <h3>
                <Link to='/'>
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
            </h3>
            {id !== 'new' ?(
                <button onClick={DeleteNote}>Delete</button>
            ):(
                <button onClick={handleSubmit}>Done</button>
            )}
            
            </div>

            <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value={note?.body}></textarea>
            
        </div>
    )
}

export default NotePage
