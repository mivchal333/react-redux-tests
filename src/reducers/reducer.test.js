import notes from './reducer';

describe('test reducer', () => {
    it('should return the initial state', () => {
      expect(notes(undefined,{})).toEqual({notesList:[], loaded:false });
    })
  
    it('should handle ADD_NOTE', () => {
        const note2add={title: "New note", category: "To do", content: "new note", status: false, date: null, time: null };
        const old_note={title: "Old note", category: "category", content: "old note", status: false, date: null, time: null };
      expect(notes({notesList:[], loaded: true}, {type: 'ADD_NOTE',new_note:note2add})).toEqual({notesList:[note2add],loaded: true});
      expect(notes({notesList:[old_note], loaded:true },{type: 'ADD_NOTE',new_note:note2add})).toEqual({notesList:[old_note,note2add], loaded:true});
    });


    it('should handle SHOW_ALL', () => {
        const notesList=[{title: "New note", category: "To do", content: "new note", status: false, date: null, time: null },{title: "Old note", category: "category", content: "old note", status: false, date: null, time: null }];
        expect(notes({notesList:[], loaded:false }, {type: 'SHOW_ALL', notes:notesList})).toEqual({notesList:notesList,loaded: true});
      
    });

    it('should handle EDIT_NOTE', () => {
        const notesList=[{noteId:2,title: "New note", category: "To do", content: "new note", status: false, date: null, time: null },{noteId:1,title: "Old note", category: "category", content: "old note", status: false, date: null, time: null }];
        const noteEdited={noteId:2,title: "New note edited", category: "To do", content: "new note", status: false, date: null, time: null };
        const notesListAfterEdition=[{noteId:2,title: "New note edited", category: "To do", content: "new note", status: false, date: null, time: null },{noteId:1,title: "Old note", category: "category", content: "old note", status: false, date: null, time: null }];
        
      expect(notes({notesList:notesList}, {type: 'EDIT_NOTE',updated_note:noteEdited})).toEqual({notesList:notesListAfterEdition});
      
    });

    it('should handle DELETE_NOTE', () => {
        const notesList=[{noteId:2,title: "New note", category: "To do", content: "new note", status: false, date: null, time: null },{noteId:1,title: "Old note", category: "category", content: "old note", status: false, date: null, time: null }];
        const note4del={id:2};
        const notesListAfterDeletion=[{noteId:1,title: "Old note", category: "category", content: "old note", status: false, date: null, time: null }];
        
      expect(notes({notesList:notesList}, {type: 'DELETE_NOTE',note_id:note4del.id})).toEqual({notesList:notesListAfterDeletion});
      
    });
});