import React, { Component } from 'react';
import Navbar from "./other/Navbar";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./Home";
import Calendar from "./other/Calendar";
import AddNote from './other/AddNote';
import Notes from './Notes';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ChangeNoteStatusForm from "./forms/ChangeNoteStatusForm";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as NotesApi from './api/NotesApi';

/*
kontrakt komponentu

1. Co renderuje komponent? 
2. Jakie właściwości przekazuje swoim komponentom potomnym?
3. Czy przechowuje on stan? Jaka jest zawartość stanu?
4. Jakie są możliwe interakcje użytkownika? Czy wpływają one na stan komponentu? Czy zmieniają renderowaną strukturę i jej zawartość?
*/


 

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //  notesList: [],
      todayNotes: [],
      todayDate: ''
    };
  }
  createNotification(message, type) {
    switch (type) {
      case "SUCCESS":
        NotificationManager.success('Success', message);
        break;
      case "ERROR":
        NotificationManager.error('Error', message);
        break;
      default:
        break;
    }
  }

  showChangeNoteStatusForm = (note) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ChangeNoteStatusForm note={note} onClose={onClose} changeNoteStatus={this.changeNoteStatus} />
        )
      }
    });
  }

  addZero = (number) => {
    return number < 10 ? '0' + number : number;
  }
  calculateNoteId = () => {
    const { notesList } = this.state;
    let maxId = 0;
    if (notesList.length > 0)
      notesList.forEach((note) => {
        if (note.id >= maxId)
          maxId = note.id;
      });
    return maxId + 1;
  }

  componentDidMount() {
    this.props.showAll();
    

    const {todayNotes } = this.state;
    if (todayNotes.length === 0) {
      var today = new Date();
      var date = today.getFullYear() + '-' + this.addZero(today.getMonth() + 1) + '-' + this.addZero(today.getDate());
      

      NotesApi.getNotesByDate(date)
        .then(response => {
          var notes = response;
          notes.sort((a, b) => {
            if (a.time < b.time)
              return -1;
            return 1;
          });

          date = this.filterDate(date);

          this.setState({
            todayNotes: notes,
            todayDate: date,
          });
        })
        .catch(err => {
          console.log(err);
        });
        
    }
  }
  filterDate(date) {
    var newDate = new Date(date);
    var formatedDate = newDate.getDate() + " " + newDate.toLocaleString('en', { month: 'long' }) + " " + newDate.getFullYear();
    return formatedDate;
  }

  validateAddForm = (note) => {
    var messages = [];

    if (note.title === "") {
      messages.push("Note title is required");
    } else if (note.title.length < 3) {
      messages.push("Minimum 3 characters in note title");
    }

    if (note.title.length > 25) {
      messages.push("Maximum 25 characters in note title");
    }

    if (note.content === "") {
      messages.push("Note content is required");
    } else if (note.content.length < 5) {
      messages.push("Minimum 5 characters in note content");
    }

    if (note.content.length > 100) {
      messages.push("Maximum 100 characters in note content");
    }

    if (note.category === "") {
      messages.push("Note category is required");
    } else if (note.category.length < 3) {
      messages.push("Minimum 3 characters in note category");
    }

    if (note.category.length > 20) {
      messages.push("Maximum 20 characters in note category");
    }

    if (note.date === null && note.time !== null) {
      messages.push("You have to add date of new note");
    }

    if (note.time === null && note.date !== null) {
      messages.push("You have to add time of new note");
    }

    if (note.date !== null && note.time !== null) {
      var message = this.validateDateFromPicker(note.date, note.time);
      if (message.length !== 0)
        messages.push(message);
    }

    return messages;
  }

  validateDateFromPicker = (date, time) => {
    var message = "";

    if (this.compareWithTodayDate(date, time) === 1) {
      message = "The date of the note have to greater than the current date";
    }
    return message;
  }

  compareWithTodayDate(dateToCompare, timeToCompare) {
    var tmp = dateToCompare.split("-");
    var year = tmp[0];
    var month = tmp[1];
    var day = tmp[2];

    tmp = timeToCompare.split(":");
    var hours = tmp[0];
    var minutes = tmp[1];

    var date = new Date();
    this.setDate(date, year, month, day, hours, minutes);
    var todayDate = new Date();

    return date.getTime() <= todayDate.getTime() ? 1 : -1;
  }

  setDate(date, year, month, day, hours, minutes) {
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setMilliseconds(0);
  }

  addNote = (s) => {
    var date = s.date === undefined ? null : s.date;
    var time = s.time === undefined ? null : s.time;
    var status = "";
    var category = s.category.replace(/ +/g, "");
    if (category.toUpperCase() === "TODO") {
      status = false;
      category = "To do";
    }
    else
      category = s.category

    var body = {
      title: s.title,
      category: category,
      content: s.content,
      status: status,
      date: date,
      time: time
    }

    var message = this.validateAddForm(body);
    if (message.length === 0) {
      this.props.addNote(body);  
    }
      else {
        for (let i = 0; i < message.length; i++)
          this.createNotification(message[i], "ERROR");
      }
  }


  validateEditForm = (note) => {
    var messages = [];

    if (note.title === "") {
      messages.push("Note title is required");
    } else if (note.title.length < 3) {
      messages.push("Minimum 3 characters in note title");
    }

    if (note.title.length > 25) {
      messages.push("Maximum 25 characters in note title");
    }

    if (note.content === "") {
      messages.push("Note content is required");
    } else if (note.content.length < 5) {
      messages.push("Minimum 5 characters in note content");
    }

    if (note.content.length > 100) {
      messages.push("Maximum 100 characters in note content");
    }

    if (note.category === "") {
      messages.push("Note category is required");
    } else if (note.category.length < 3) {
      messages.push("Minimum 3 characters in note category");
    }

    if (note.category.length > 20) {
      messages.push("Maximum 20 characters in note category");
    }

    return messages;
  }

  editNote = (note, s) => {
    var status = "";

    var category = s.editCategory.replace(/ +/g, "");
    if (category.toUpperCase() === "TODO") {
      status = false;
      category = "To do";
    } else
      category = s.editCategory

    var body = {
      "noteId": note.noteId,
      "title": s.editTitle,
      "category": category,
      "content": s.editContent,
      "status": status,
      "date": note.date,
      "time": note.time
    }

    var messages = this.validateEditForm(body);
    if (messages.length === 0) {
      /*NotesApi.editNote(note.noteId, body)
        .then(response => {
          if (response.status === 200) {
            this.createNotification('Note was edited successfully', "SUCCESS");
            this.updateNotesList("PUT", body);
          }
        });*/
        this.props.editNote(body);
    }
     else {
      for (let i = 0; i < messages.length; i++)
        this.createNotification(messages[i], "ERROR");
    }
  }

 /* updateNotesList = (action, body) => {
    switch (action) {
      case "PUSH":
        this.setState(state => {
          var list = state.notesList;
          var newNote = {
            noteId: this.calculateNoteId(),
          };

          Object.assign(newNote, body);
          list.push(newNote);
          return { notesList: list };
        });
        break;
      case "PUT":
        this.setState(state => {
          var list = state.notesList;
          var noteIndex = list.findIndex(note => note.noteId === body.noteId);
          list[noteIndex].title = body.title;
          list[noteIndex].category = body.category;
          list[noteIndex].content = body.content;
          list[noteIndex].status = body.status;
          list[noteIndex].time = body.time;
          list[noteIndex].date = body.date;

          return { notesList: list };
        });
        break;
      case "DELETE":
        this.setState(state => {
          var list = state.notesList;
          var noteIndex = list.findIndex(note => note.noteId === body);
          list.splice(noteIndex);
          return { notesList: list };
        });
        break;
      default:
        break;
    }
  }*/

 // deleteNote = (id) => {
   /* NotesApi.deleteNote(id)
      .then(response => {
        if (response.status === 204) {
          this.createNotification('Note was removed succesfully', "SUCCESS");
          this.updateNotesList("DELETE", id)
        }
      });*/
   /*   console.log("app id ",id);
      this.props.deleteNote(id);  
  }*/

  changeNoteStatus = (note) => {
    note.status = !note.status;
    /*NotesApi.editNote(note.noteId, note)
      .then(response => {
        if (response.status === 200) {
          this.createNotification('The status of the note was changed successfully', "SUCCESS");
          this.updateNotesList("PUT", note);
        }
      })
      .catch(err => {
        console.log(err.response.data)
      });*/
      this.props.editNote(note);
  }

  remindNote = (note, date, time) => {
    let message = this.validateDateFromPicker(date, time);
    if (message.length === 0) {
      note.date = date;
      note.time = time;
     /* NotesApi.editNote(note.noteId, note)
        .then(res => {
          if (res.status === 200) {
            this.createNotification('Notification was edited succesfully', "SUCCESS");
            this.updateNotesList("PUT", note)
          }
        });*/
       
        this.props.editNote(note);
    } else {
      this.createNotification(message, "ERROR");
    }
  }

  render() {
    const { notes, deleteNote}=this.props;
    //console.log("App ", this.props);
    const notesList=this.props.notes.notesList;

    const  {todayNotes, todayDate } = this.state;
    return (
      <Router>
        <Navbar />
        <Route exact path="/"
          render={() => <Home
            changeNoteStatus={this.changeNoteStatus}
            addZero={this.addZero}
            showChangeNoteStatusForm={this.showChangeNoteStatusForm}
            todayNotes={todayNotes}
            todayDate={todayDate} />} />
        { notes.loaded && <Route path="/allNotes"
          render={() => <Notes
            deleteNote={deleteNote}
            remindNote={this.remindNote}
            editNote={this.editNote}
            addZero={this.addZero}
            showChangeNoteStatusForm={this.showChangeNoteStatusForm}
            notesList={notesList}
          />} />}
          <Route path="/addNote"
          render={() => <AddNote addNote={this.addNote} />} />
          {notes.loaded&&<Route path="/calendar"
          render={() => <Calendar
            addZero={this.addZero}
            notesList={notesList} />} />}
      </Router>
    );
  }
}
export default App;
