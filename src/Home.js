import React from 'react';
import TodayNote from './other/TodayNote';
import Confetti from './other/Confetti';

const Home = (props) =>{

        return (
            <div className="content">
                <div className="header">{props.todayDate}</div>
                {
                    props.todayNotes.length !== 0 ? (
                        <div className="todayNotes">
                            {
                                props.todayNotes.map(todayNote => {
                                    return <TodayNote key={todayNote.noteId} todayNote={todayNote} onClick={props.showChangeNoteStatusForm} />
                                })
                            }

                        </div>
                    ) : (
                            <Confetti size="800px" />
                        )
                }
            </div>
        );
    }

export default Home;