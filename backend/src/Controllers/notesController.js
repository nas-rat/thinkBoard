
import prisma from "../Config/prisma.js";

export async function getNotes(req, res) {
    try {
        const notes = await prisma.note.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNotes:", error);
        res.status(500).json({ message: "Error fetching notes" });
    }
}

export async function getNoteById(req, res) {
    const { id } = req.params;

    try {
        const note = await prisma.note.findUnique({
            where: { id }
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById:", error);
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

        res.status(201).json({
            message: "Note created successfully",
            newNote
        });
    } catch (error) {
        console.error("Error in createNote:", error);
        res.status(500).json({ message: "Error creating note" });
    }
}

export async function deleteNote(req, res) {
    const { id } = req.params;

    try {
        const deletedNote = await prisma.note.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Note deleted successfully",
            deletedNote
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        console.error("Error in deleteNote:", error);
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

        res.status(200).json({
            message: "Note updated successfully",
            updatedNote
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        console.error("Error in updateNote:", error);
        res.status(500).json({ message: "Error updating note" });
    }
}
