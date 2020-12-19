import React, { Component } from 'react';
import { Calendar as Cal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as Icon from "react-bootstrap-icons";
import Confetti from "./Confetti";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            notesList: props.notesList,
            exactDayNotes: [],
            loaded: false,
            exactNote: []
        };
    }

    changeNotesDependsOnDay = (date) => {
        const { addZero } = this.props;

        let day = addZero(date.getDate());
        let month = addZero(date.getMonth() + 1);
        let year = date.getFullYear();
        let formatedDate = year + "-" + month + "-" + day;


        this.setState(state => {
            var list = state.notesList.filter(note => note.date === formatedDate);
            list.sort((a, b) => {
                if (a.time < b.time)
                    return -1;
                return 1;
            });
            return { exactDayNotes: list, loaded: true }
        });
    }

    componentDidMount() {
        const { date } = this.state;
        this.changeNotesDependsOnDay(date);
    }

    onChange = (date) => {
        this.changeNotesDependsOnDay(date);
        this.setState({
            exactNote: []
        });
    }

    showNoteDetails(id) {
        const { exactDayNotes } = this.state;
        let filteredNote = exactDayNotes.filter((value) => {
            return value.id === id;
        });

        this.setState({
            exactNote: filteredNote
        });
    }

    render() {
        const { exactDayNotes, loaded, exactNote } = this.state;
        return (
            <div className="content" >
                <Cal locale="EN" onChange={this.onChange} id="calendar" />
                {
                    loaded ? (
                        <div style={{ display: "flex" }}>
                            <div className="calendarContainerForExactNotes">
                                {
                                    exactDayNotes.length === 0 ? (
                                        <Confetti size="500px" />
                                    ) : (
                                            <div >
                                                {
                                                    exactDayNotes.map((note) => {
                                                        return <div key={note.id} className="calendarDayInfo" onClick={() => this.showNoteDetails(note.id)}>
                                                            <div>{note.title} </div>
                                                            <div>
                                                                <Icon.Clock size={32} />
                                                                {note.time}
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        )
                                }
                            </div>
                            {
                                exactNote.length === 0 ? (
                                    null
                                ) : (
                                        <div className="calendarExactNoteDetails">
                                            <div className="calendarExactNoteDetailsField">
                                                <b>Title: </b>
                                                <p>{exactNote[0].title}</p>
                                            </div>
                                            <div className="calendarExactNoteDetailsField">
                                                <b>Status: </b>
                                                <p>
                                                    {
                                                        exactNote[0].status ?
                                                            <Icon.Check color="green" size={36} /> :
                                                            <Icon.X color="red" size={36} />
                                                    }
                                                </p>
                                            </div>
                                            <div className="calendarExactNoteDetailsField">
                                                <b>Time:</b>
                                                <p>{exactNote[0].time}</p>
                                            </div>
                                            <div className="calendarExactNoteDetailsField">
                                                <b>Content:</b>
                                                <p style={{ marginLeft: "30px" }}>{exactNote[0].content}</p>
                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                    ) : (
                            null
                        )
                }
            </div>
        );
    }
}

export default Calendar;