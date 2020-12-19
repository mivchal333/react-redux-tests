import React from 'react';
import * as Icon from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';

const ChangeNoteStatusForm = (props) => {
    const { note, onClose, changeNoteStatus } = props;
    return (
        <div className="alertForm">
            <span className="closeButton">
                <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
            </span>
            <div>
                {
                    note.status ? (
                        <div>
                            <div className="importantInfoInAlert">
                                <Icon.AlertTriangle size={80} color="#F5B069" />
                                Are you sure you want to change this task status to <span style={{ color: "red" }}>undone</span>?
                            </div>
                            <div className="noteChangeStatusButtons">
                                <Button variant="primary" onClick={() => onClose()}>No</Button>
                                <Button variant="danger" style={{ marginLeft: "10px" }}
                                    onClick={() => {
                                        changeNoteStatus(note);
                                        onClose();
                                    }}>Yes</Button>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div className="importantInfoInAlert">
                                    <Icon.AlertTriangle size={80} color="#F5B069" />
                                    Are you sure you want to change this task status to <span style={{ color: "green" }}>done</span>?
                                </div>
                                <div className="noteChangeStatusButtons">
                                    <Button variant="primary" onClick={() => onClose()}>No</Button>
                                    <Button variant="danger" style={{ marginLeft: "10px" }}
                                        onClick={() => {
                                            changeNoteStatus(note);
                                            onClose();
                                        }}>Yes</Button>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ChangeNoteStatusForm;