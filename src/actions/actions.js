import * as NotesApi from '../api/NotesApi';



export const SHOW_ALL = 'SHOW_ALL'
export const ADD_NOTE = 'ADD_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'


export const addNoteAction = (new_note) => (
    {
        type: ADD_NOTE,
        new_note
    }
);

export const showAllAction = (data) => (
    {
        type: SHOW_ALL,
        notes: data
    }
);


export const deleteNoteAction = (note_id) => (
    {
        type: DELETE_NOTE,
        note_id
    }
);



export const editNoteAction = (updated_note) => (
    {
        type: EDIT_NOTE,
        updated_note
    }
);

export const showAll = () => (dispatch) => {
   return NotesApi.getAllNotes().then(data => {
        dispatch(showAllAction(data));
    }).catch(error => {
        throw (error);
    });

};

export const addNote = (new_note) => (dispatch) => {
    const new_note_2send = {title: new_note.data.title, category: new_note.data.category, content: new_note.data.content, status: new_note.data.status, date: new_note.data.date, time: new_note.data.time };
    return NotesApi.addNote(new_note_2send).then(data => {
        new_note.data.noteId=data.data.noteId;
        if (data.status === 201) dispatch(addNoteAction(new_note.data));
    }).catch(error => {
        throw (error);
    });
};

export const editNote = (updated_note) => (dispatch) => {
    const updated_note_2send = { noteId: updated_note.data.noteId, title: updated_note.data.title, category: updated_note.data.category, content: updated_note.data.content, status: updated_note.data.status, date: updated_note.data.date, time: updated_note.data.time };
    return NotesApi.editNote(updated_note_2send.noteId, updated_note_2send).then(data => {
        if (data.status === 200) dispatch(editNoteAction(updated_note.data));
    }).catch(error => {
        throw (error);
    });
};

export const deleteNote = (note_id) => (dispatch) => {
    return NotesApi.deleteNote(note_id.id).then(data => {
        if (data.status === 204) dispatch(deleteNoteAction(note_id.id));
    }).catch(error => {
        throw (error);
    });
};

