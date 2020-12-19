import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {store} from './store';

import { createStore, applyMiddleware} from 'redux';
import { connect, Provider } from 'react-redux';
import root_reducers from './reducers';
import {showAll,addNote,editNote, deleteNote} from './actions/actions';
import thunk from 'redux-thunk';
import ManageNotes from "./store";





ReactDOM.render(
    <Provider store={store}>
    <ManageNotes/>
    </Provider>  , document.getElementById('root')
  );
