import React from 'react';
import { shallow, mount } from 'enzyme';
import { App } from './App';
import Home from './Home';
import Calendar from './other/Calendar';
import AddNote from './other/AddNote';
import Notes from './Notes';
import mockAxios from 'axios';
import { MemoryRouter } from 'react-router';



//assumption: the component is excluded from Redux
describe('<App/>', () => {
  const mockShowAllfn = jest.fn();
  const mockAddNotefn = jest.fn();
  const mockEditNotefn = jest.fn();
  const mockDeleteNotefn = jest.fn();

  let appScreen;

  const store = {
    notesList: [{ title: "New note", category: "To do", content: "new note content", status: false, date: '2020-05-19', time: null, noteId:1 }, { title: "Old note", category: "category", content: "old note content", status: false, date: null, time: null, noteId:2 }],
    loaded: true
  };

  beforeEach(()=>{
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [{ title: "New note", category: "To do", content: "new note content", status: false, date: '2020-05-19', time: null, noteId:1 }, { title: "Old note", category: "category", content: "old note content", status: false, date: null, time: null, noteId:2 }]
    })
  );
  });

  afterEach(() => {
    mockAxios.get.mockClear();
    appScreen=undefined;
});

  it('renders', () => {
    appScreen = shallow(<App notes={store} deleteNote={mockDeleteNotefn} addNote={mockAddNotefn} editNote={mockEditNotefn} showAll={mockShowAllfn} />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(appScreen.exists()).toBe(true);
    
  });


  it('router path /', () => {
    appScreen = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App notes={store} deleteNote={mockDeleteNotefn} addNote={mockAddNotefn} editNote={mockEditNotefn} showAll={mockShowAllfn}/>
      </MemoryRouter>
    );
    expect(appScreen.find(Home)).toHaveLength(1);
    expect(appScreen.find(Notes)).toHaveLength(0);
    expect(appScreen.find(Calendar)).toHaveLength(0);
    expect(appScreen.find(AddNote)).toHaveLength(0);
  });

  it('router path /allNotes and loaded=false', () => {
    const initialStore = {
      notesList: [],
      loaded: false
    };
    appScreen = mount(
      <MemoryRouter initialEntries={[ '/allNotes' ]}>
        <App notes={initialStore} deleteNote={mockDeleteNotefn} addNote={mockAddNotefn} editNote={mockEditNotefn} showAll={mockShowAllfn}/>
      </MemoryRouter>
    );
    expect(appScreen.find(Home)).toHaveLength(0);
    expect(appScreen.find(Notes)).toHaveLength(0);
    expect(appScreen.find(Calendar)).toHaveLength(0);
    expect(appScreen.find(AddNote)).toHaveLength(0);
    
    
  });

  it('router path /allNotes and loaded=true', () => {
    
    appScreen = mount(
      <MemoryRouter initialEntries={[ '/allNotes' ]}>
        <App notes={store} deleteNote={mockDeleteNotefn} addNote={mockAddNotefn} editNote={mockEditNotefn} showAll={mockShowAllfn}/>
      </MemoryRouter>
    );
    expect(appScreen.find(Calendar)).toHaveLength(0);
    expect(appScreen.find(Home)).toHaveLength(0);
    expect(appScreen.find(Notes)).toHaveLength(1);
    expect(appScreen.find(AddNote)).toHaveLength(0);
  });

  describe('<App/> children props', () => {

    it('Child Home receives props from App', () => {
      appScreen = mount(
        <MemoryRouter initialEntries={[ '/' ]}>
          <App notes={store} deleteNote={mockDeleteNotefn} addNote={mockAddNotefn} editNote={mockEditNotefn} showAll={mockShowAllfn}/>
        </MemoryRouter>
      );
      const app=appScreen.find(App);
      const child=appScreen.find(Home);
      expect(child.length).toBe(1);
      expect(app.length).toBe(1);
      
      expect(child.prop('changeNoteStatus')).toEqual(app.instance().changeNoteStatus);
      expect(child.prop('addZero')).toEqual(app.instance().addZero);
      expect(child.prop('showChangeNoteStatusForm')).toEqual(app.instance().showChangeNoteStatusForm);
      expect(child.prop('todayNotes')).toEqual(app.state('todayNotes'));
      expect(child.prop('todayDate')).toEqual(app.state('todayDate'));
    });
    
    
  });

  
  

});

