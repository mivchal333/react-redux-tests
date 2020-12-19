import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore, applyMiddleware} from 'redux';
import { connect, Provider } from 'react-redux';
import root_reducers from './reducers';
import {showAll,addNote,editNote, deleteNote} from './actions/actions';
import thunk from 'redux-thunk';



export const store = createStore(root_reducers,applyMiddleware(thunk));
 
const mapStateToProps = (state) => {
  return  {...state};
};
const mapDispatchToProps = (dispatch) => {
  return {
    showAll: () => dispatch(showAll()),
    addNote: (new_note) => dispatch(addNote({data:new_note})),
    editNote: (updated) => dispatch(editNote({data:updated})),
    deleteNote: (id) => dispatch(deleteNote({id:id}))
  }
};

const  ManageNotes= connect(mapStateToProps, mapDispatchToProps)(App);
export default ManageNotes;