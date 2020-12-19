import React from 'react';
import * as Icon from "react-bootstrap-icons";

const TodayNote = (props) => {
    const { todayNote, onClick } = props;
    return (
        <div className="todayNote" onClick={() => onClick(todayNote.noteId)}>
            <div className="todayNoteTitle">
                <p>{todayNote.title}</p>
                <div className="todayNoteDate">
                    <p>{todayNote.date}</p>
                    <Icon.Calendar size={42} />
                </div>
            </div>
            <div className="todayNoteTimeAndStatus">
                <p>{todayNote.time}</p>
                <Icon.Clock size={42} />
            </div>
            {
                todayNote.status !== "" ? (
                    <div className="todayNoteTimeAndStatus">
                        <p>Status
                            {todayNote.status ? <Icon.Check color="green" size={42} /> : <Icon.X color="red" size={42} />}
                        </p>
                    </div>
                ) : (
                    null
                    )
            }

            <p>{todayNote.content}</p>
        </div>
    );
}

export default TodayNote;