import { NotificationManager } from 'react-notifications';

export default function notes (state={notesList:[], loaded:false }, action)  {
    let new_state;
      switch (action.type) {
        case 'SHOW_ALL':
          new_state=Object.assign({}, state);
          new_state.notesList=action.notes;
          new_state.loaded=true;
        return new_state;

        case 'ADD_NOTE':
          NotificationManager.success('Success', "Note was added succesfully");
          const ret=Object.assign({},state,{notesList:[...state.notesList,action.new_note]});
          return ret;

        case 'EDIT_NOTE':
            new_state = Object.assign({}, state);
            new_state.notesList.forEach((el, index,tab)=>{
                    if(el.noteId===action.updated_note.noteId) tab[index]=action.updated_note;
                    return el;
            });
              NotificationManager.success('Success', "Note was edited succesfully");
            return new_state;

        case 'DELETE_NOTE':
            new_state = Object.assign({}, state);
            let id=-1;
            new_state.notesList.forEach((el, index)=>{
                    if(el.noteId===action.note_id) id=index;
                    return id;
            });
            new_state.notesList.splice(id,1);
            NotificationManager.success('Success', 'Note was removed succesfully');
            return new_state;
        
        default:
          return state
      }
    }
  

    
    
  
    