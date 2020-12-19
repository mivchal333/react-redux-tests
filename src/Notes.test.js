import React from 'react';
import { shallow, mount } from 'enzyme';
import Notes from './Notes';
import { Table } from 'react-bootstrap';
import Note from "./other/Note";

/*
in <App/>
<Notes
            deleteNote={deleteNote}
            remindNote={this.remindNote}
            editNote={this.editNote}
            addZero={this.addZero}
            showChangeNoteStatusForm={this.showChangeNoteStatusForm}
            notesList={notesList}
          />
*/


describe('<Notes/>', () => {
    let appScreen;
    let appInstance;

    const deleteNote = jest.fn();
    const remindNote = jest.fn();
    const editNote = jest.fn();
    const addZero = jest.fn();
    const showChangeNoteStatusForm = jest.fn();
    const emptyNoteList = [];
    const noteList = [{ noteId: 1, title: "Do shopping", category: "To do", content: "milk, bread, butter", status: false, date: null, time: null }, { title: "Go to the gym", category: "To do", content: "Go to the gym with John", status: true, date: "2020-04-28", time: "15:30", noteId: 2 }];

    beforeEach(() => {
        appScreen = shallow(<Notes
            deleteNote={deleteNote}
            remindNote={remindNote}
            editNote={editNote}
            addZero={addZero}
            showChangeNoteStatusForm={showChangeNoteStatusForm}
            notesList={noteList}
        />);
        appInstance = appScreen.instance();
    });

    afterEach(() => {
        appScreen = undefined;
        appInstance = undefined;
    });

    it('renders', () => {
        expect(appScreen.exists()).toBe(true);
        expect(appScreen.first().type()).toBe('div');
        expect(appScreen.find('p').length).toBe(1);
        expect(appScreen.find('p').text()).toEqual('LIST OF NOTES');
        expect(appScreen.find(Table).length).toBe(1);
        expect(appScreen.find(Note).length).toBe(2);
    });

    it('receives props', () => {
        expect(appScreen.find(Note).at(0).prop('showChangeNoteStatusForm')).toEqual(showChangeNoteStatusForm);
        expect(appScreen.find(Note).at(1).prop('showChangeNoteStatusForm')).toEqual(showChangeNoteStatusForm);
        expect(appScreen.find(Note).at(0).prop('content')).toEqual(noteList[0].content);
        expect(appScreen.find(Note).at(1).prop('content')).toEqual(noteList[1].content);
        expect(appScreen.find(Note).at(0).prop('note')).toEqual(noteList[0]);
        expect(appScreen.find(Note).at(1).prop('note')).toEqual(noteList[1]);

    });


    it('changes props', () => {
        appScreen = mount(<Notes
            deleteNote={deleteNote}
            remindNote={remindNote}
            editNote={editNote}
            addZero={addZero}
            showChangeNoteStatusForm={showChangeNoteStatusForm}
            notesList={noteList}
        />);
        const showChangeNoteStatusFormNew = jest.fn();
        const noteListNew = [{ noteId: 1, title: "Do exercise", category: "To do", content: "legs", status: true, date: null, time: null }];
        const propsComp = {
            'deleteNote': deleteNote, 'remindNote': remindNote, 'editNote': editNote, 'addZero': addZero,
            'showChangeNoteStatusForm': showChangeNoteStatusFormNew, 'notesList': noteListNew
        };
        appScreen.setProps(propsComp);
        expect(appScreen.find(Note).length).toBe(1);
        expect(appScreen.find(Note).at(0).prop('showChangeNoteStatusForm')).toEqual(showChangeNoteStatusFormNew);
        expect(appScreen.find(Note).at(0).prop('content')).toEqual(noteListNew[0].content);
        expect(appScreen.find(Note).at(0).prop('note')).toEqual(noteListNew[0]);
    });


});