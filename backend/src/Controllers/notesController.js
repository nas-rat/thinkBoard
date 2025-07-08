import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export async function getNotes(req, res) {

    try {
        const notes = await prisma.note.findMany({
            orderBy: {
                createdAt: 'desc' // to get the latest notes first
            }
        });
        res.status(200).json(notes);
    } catch (error) {
        console.log("error in getNotes", error);
        res.status(500).json({ message: "Error fetching notes" });
    }
}

export async function getNoteById(req, res) {
    const { id } = req.params;
    try {
        const ByIdNote = await prisma.note.findUnique({
            where: { id }
        });
        if (!updateNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(ByIdNote);
    } catch (error) {
        console.log("error in getNoteById controller", error);
        res.status(500).json({ message: "Error fetching note" });
    }
}

export async function createNote(req, res) {

    try {
        const { title, content } = req.body;
        const newNote = await prisma.note.create({
            data: {
                title,
                content
            }
        });
        res.status(201).json({ message: "Note created successfully", newNote });
    } catch (error) {
        console.log("error in createNote controller", error);
        res.status(500).json({ message: "Error creating note" });
    }
}
export async function deleteNote(req, res) {
    const { id } = req.params;

    try {
        const deletedNote = await prisma.note.delete({
            where: { id }
        });
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully", deletedNote });
    } catch (error) {
        console.log("error in deleteNote controller", error);
        res.status(500).json({ message: "Error deleting note" });
    }
}
export async function updateNote(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                title,
                content
            }
        });
        if (!updateNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated successfully", updatedNote });
    } catch (error) {
        console.log("error in updateNote controller", error);
        res.status(500).json({ message: "Error updating note" });
    }
}