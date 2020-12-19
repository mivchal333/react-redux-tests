import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import React from 'react';


import ManageNotes from './store';

describe('Index Redux',()=>{
    let store;
    const notesList=[{title: "New note", category: "To do", content: "new note", status: false, date: null, time: null },{title: "Old note", category: "category", content: "old note", status: false, date: null, time: null }];
   
    const thunk = ({ dispatch, getState }) => next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }
      return next(action)
    }

  const create = () => {
      store = {
        getState: jest.fn(() => ({notes: {
          notesList:notesList,
          loaded: true
        }})),
        dispatch: jest.fn()
      }
      const next = jest.fn();
      const invoke = action => thunk(store)(next)(action);
      return { store, next, invoke };
    }
   
 
  beforeEach(() => {
    
  });

  it('renders', () => {
      const { store } = create();
      const component=shallow(<ManageNotes store={store}/>);
      expect(component.exists()).toBe(true);
    });
    
    it('passes through non-function action', () => {
      const { next, invoke } = create();
      const action = { type: 'SHOW_ALL' };
      invoke(action);
      expect(next).toHaveBeenCalledWith(action);
    });
    
    it('calls the function', () => {
      const { invoke } = create();
      const fn = jest.fn();
      invoke(fn);
      expect(fn).toHaveBeenCalled();
    });
    
    it('passes dispatch and getState', () => {
      const { store, invoke } = create();
      invoke((dispatch, getState) => {
        dispatch('TEST DISPATCH')
        getState()
      })
      expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
      expect(store.getState).toHaveBeenCalled();
    });
  
  });
  