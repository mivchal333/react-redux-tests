import React from 'react';
import * as Icon from "react-bootstrap-icons";

const DetailForm = (props) => {
    const { note, onClose } = props;
    return (
        <div className="alertForm">
            <span className="closeButton">
                <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
            </span>
            <div className="headerDetail">
                <div>
                    {note.title}
                </div>
                {
                    note.category === "To do" ? (
                        <Icon.ListCheck size={40} />
                    ) : (
                            <Icon.DocumentText size={40} />
                        )}
            </div>
            <div className="contentDetail">
                {note.content}
            </div>
            <div>
                {
                    note.date !== null ? (
                        <div className="dateDetail">
                            {note.date} ({note.time})
                         </div>
                    ) : (
                            null
                        )
                }
            </div>
        </div>
    );
};

export default DetailForm;