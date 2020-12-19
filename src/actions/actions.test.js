import * as actions from './actions';
import thunk from 'redux-thunk';

import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    let list=null;

    beforeEach(() => {
        list = [{ "noteId": 1, "title": "Do shopping", "category": "To do", "content": "milk, bread, butter", "status": false, "date": null, "time": null }, { "title": "Go to the gym", "category": "To do", "content": "Go to the gym with John", "status": true, "date": "2020-04-28", "time": "15:30", "noteId": 2 }, { "noteId": 3, "title": "Recipe for honey cake", "category": "Recipes", "content": "add 1 kg of flour\nadd 1 spoon of honey\nadd a half cube of butter\n\nmix everything\nbake 20 minutes", "status": "", "date": null, "time": null }, { "noteId": 4, "title": "English words", "category": "Remember", "content": "eat alfresco", "status": "", "date": null, "time": null }, { "noteId": 6, "title": "Make review", "category": "To do", "content": "for the exam", "status": false, "time": "12:00" }];
    }
    );
    
    afterEach(() => {
        list=null;
    });

    it('should create an action showAllAction', () => {
        const expectedAction = {
            type: 'SHOW_ALL',
            notes: list
        };
        expect(actions.showAllAction(list)).toEqual(expectedAction);
    });

    it('should create an action addNoteAction', () => {
        const new_note={ "noteId": 10, "title": "New title", 
        "category": "To do", 
        "content": "new content", "status": false, "date": null, "time": null };
        const expectedAction = {
            type: 'ADD_NOTE',
            new_note
        };
        expect(actions.addNoteAction(new_note)).toEqual(expectedAction);
    });

    it('should create an action deleteNoteAction', () => {
        const note_id=1;
        const expectedAction = {
            type: 'DELETE_NOTE',
            note_id
        }
        expect(actions.deleteNoteAction(note_id)).toEqual(expectedAction);
    });

    it('should create an action editNoteAction', () => {
        const updated_note={ "noteId": 1, "title": "New title", 
        "category": "To do", 
        "content": "new content", "status": false, "date": null, "time": null };
        const expectedAction = {
            type: 'EDIT_NOTE',
            updated_note
        }
        expect(actions.editNoteAction(updated_note)).toEqual(expectedAction);
    });
});

describe('action creator functions', () => {
    const showAllAction = (data) => (
        {
            type: 'SHOW_ALL',
            notes: data
        }
    );

    const addNoteAction = (new_note) => (
        {
            type: 'ADD_NOTE',
            new_note
        }
    );
       
    
    const deleteNoteAction = (note_id) => (
        {
            type: 'DELETE_NOTE',
            note_id
        }
    );
    
    
    
    const editNoteAction = (updated_note) => (
        {
            type: 'EDIT_NOTE',
            updated_note
        }
    );
    


    beforeEach(() => {
        
    }
    );
    
    afterEach(() => {
        mockAxios.mockClear();
    });

    it('should create an action showAllAction when data is received', async () => {
        const list = [{ "noteId": 1, "title": "Do shopping", "category": "To do", "content": "milk, bread, butter", "status": false, "date": null, "time": null }, { "title": "Go to the gym", "category": "To do", "content": "Go to the gym with John", "status": true, "date": "2020-04-28", "time": "15:30", "noteId": 2 }];
      
          mockAxios.get.mockResolvedValue({data: list});
      
          const expectedActions = [{ type: 'SHOW_ALL', notes: list }];
          const store = mockStore({});
          
          //await store.dispatch(actions.showAll());
          //expect(store.getActions()).toEqual(expectedActions);
          //expect(store.getState()).toEqual([]);
      
          return store.dispatch(actions.showAll()).then(() => {
            expect(store.getActions()).toEqual([showAllAction(list)]);
            });

});


    it('should create an action addNoteAction when new note is added', async () => {
        const new_note ={data: { noteId: undefined, title: "New note", category: "To do", content: "new note", status: false, date: null, time: null }};
        let new_note_ret=new_note;
        new_note_ret.data.noteId=10;
        mockAxios.post.mockResolvedValue({status: 201, data: new_note_ret.data});
      
        const store = mockStore({});
        
         return store.dispatch(actions.addNote(new_note)).then(() => {
            expect(store.getActions()).toEqual([addNoteAction(new_note.data)]);
            });


    });

    it('should create an action deleteNoteAction when note is deleted', async () => {
        const note_del ={id:1};
        mockAxios.delete.mockResolvedValue({status: 204});
      
        const store = mockStore({});
        
         return store.dispatch(actions.deleteNote(note_del)).then(() => {
            expect(store.getActions()).toEqual([deleteNoteAction(note_del.id)]);
            });

    });

    it('should create an action editNoteAction when note is deleted', async () => {
        const edited_note ={data: { noteId: 1, title: "Edited note", category: "To do", content: "edited note", status: false, date: null, time: null }};
        mockAxios.put.mockResolvedValue({status: 200});
      
        const store = mockStore({});
        
         return store.dispatch(actions.editNote(edited_note)).then(() => {
            expect(store.getActions()).toEqual([editNoteAction(edited_note.data)]);
            });


    });
});
