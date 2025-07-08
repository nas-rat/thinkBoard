import express from 'express';
import { getNotes, createNote, deleteNote, updateNote, getNoteById } from '../Controllers/notesController.js';

const router = express.Router();

router.get('/', getNotes);

router.get('/:id', getNoteById);

router.post('/', createNote);

router.delete('/:id', deleteNote);

router.put('/:id', updateNote);

export default router;