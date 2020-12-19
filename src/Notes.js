import React, { Component } from "react";
import Note from "./other/Note";
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditForm from "./forms/EditForm";
import DetailForm from "./forms/DetailForm";
import DeleteForm from "./forms/DeleteForm";


import RemindForm from "./forms/RemindForm";


/*
kontrakt komponentu

1. Co renderuje komponent? 
2. Jakie właściwości przekazuje swoim komponentom potomnym?
3. Czy przechowuje on stan? Jaka jest zawartość stanu?
4. Jakie są możliwe interakcje użytkownika? Czy wpływają one na stan komponentu? Czy zmieniają renderowaną strukturę i jej zawartość?
*/

class Notes extends Component {
  filter(content) {
    return content.length > 25 ? content.substring(0, 25) + "..." : content;
  }

  showEditForm = (note) => {
    const { editNote } = this.props;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <EditForm note={note} onClose={onClose} editNote={editNote} />
            
          </div>
        );
      }
    });
  }

  showDeleteForm = (note) => {
    const { deleteNote } = this.props;

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteForm note={note} onClose={onClose} deleteNote={deleteNote} />
        );
      }
    });
  }

  showDetailForm = (note) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DetailForm note={note} onClose={onClose} />
        );
      }
    });
  }

  showRemindForm = (note) => {
    const { remindNote, addZero } = this.props;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <RemindForm onClose={onClose} note={note} remindNote={remindNote} addZero={addZero} />
            
          </div>
        );
      }
    });

  }

  render() {
    const { showChangeNoteStatusForm, notesList } = this.props;
    
    return (
      <div className="content" >
        
        <p className="header">LIST OF NOTES</p>
        <Table striped bordered>
          <thead>
            <tr align="center">
              <th>Title</th>
              <th>Category</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notesList.map((note) => {
                return (
                  <Note
                    key={note.noteId}
                    content={this.filter(note.content)}
                    note={note}
                    showDetailForm={this.showDetailForm}
                    showEditForm={this.showEditForm}
                    showDeleteForm={this.showDeleteForm}
                    showChangeNoteStatusForm={showChangeNoteStatusForm}
                    showRemindForm={this.showRemindForm}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Notes;