import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import RatelimitedUI from '../components/RatelimitedUI'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound.jsx'

const homePage = () => {

    const [IsRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([])
    const [isloading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Error fetching notes:", error);
                if (error.response.status === 429) {
                    setIsRateLimited(true);
                    toast.error("You have reached the rate limit. Please try again later.");
                } else {
                    toast.error("An error occurred while fetching notes.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, [])

    return (

        <div className='min-h-screen '>
            <Navbar />

            {IsRateLimited && <RatelimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {isloading && <div className="text-center text-primary py-10">Loading notes...</div>}

                {notes.length === 0 && !IsRateLimited && (<NotesNotFound />)}

                {notes.length > 0 && !IsRateLimited && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {notes.map(note => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
}

export default homePage