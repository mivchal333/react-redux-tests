import React from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from "react-bootstrap-icons";

const DeleteForm = (props) => {
    const { deleteNote, onClose, note } = props;
    return (
        <div className="alertForm">
            <span className="closeButton">
                <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
            </span>
            <div className="importantInfoInAlert">
                <Icon.Info size={60} color="#017BFF" />
                Are you sure you want to delete this note?
            </div>
            <div className="noteDeleteButtons">
                <Button variant="primary" onClick={() => onClose()}>No</Button>
                <Button variant="danger" style={{ marginLeft: "10px" }}
                    onClick={() => {
                        deleteNote(note.noteId);
                        onClose();
                    }}>Yes</Button>
            </div>
        </div>
    );
};

export default DeleteForm;