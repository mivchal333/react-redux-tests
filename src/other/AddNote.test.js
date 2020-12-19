import React from 'react';
import { shallow, mount } from 'enzyme';
import AddNote from './AddNote';
import { Button } from 'react-bootstrap';

/*
in <App/>
<AddNote addNote={this.addNote} />
*/


describe('<AddNote/>', () => {
    let appScreen;
    let appInstance;

    const addNote = jest.fn();


    beforeEach(() => {
        appScreen = shallow(<AddNote addNote={addNote} />);
        appInstance = appScreen.instance();
    });

    afterEach(() => {
        appScreen = undefined;
        appInstance = undefined;
    });

    it('renders', () => {
        expect(appScreen.exists()).toBe(true);
        expect(appScreen.first().type()).toBe('div');
        expect(appScreen.find('div').length).toBe(12);
        expect(appScreen.find('input').length).toBe(4);
        expect(appScreen.find('textarea').length).toBe(1);
    });


    it('onChanges of inputs', () => {
        const inputTitle=appScreen.find('input').at(0);
        const inputCat=appScreen.find('input').at(1);
        const inputDate=appScreen.find('input').at(2);
        const inputTime=appScreen.find('input').at(3);
        const textAreaContent=appScreen.find('input').at(0);
        
        inputTitle.simulate('change',{target:{id: 'title', value: 'new title'}});
        expect(appScreen.state('title')).toEqual('new title');

        inputCat.simulate('change',{target:{id: 'category', value: 'new category'}});
        expect(appScreen.state('category')).toEqual('new category');

        inputDate.simulate('change',{target:{id: 'date', value: '2020-05-21'}});
        expect(appScreen.state('date')).toEqual('2020-05-21');

        inputTime.simulate('change',{target:{id: 'time', value: '10:55'}});
        expect(appScreen.state('time')).toEqual('10:55');

        textAreaContent.simulate('change',{target:{id: 'content', value: 'new content'}});
        expect(appScreen.state('content')).toEqual('new content');
        
      });

    it('call parent\'s function with a proper note\'s body', () => {
      appScreen=mount(<AddNote addNote={addNote} />);
      const button=appScreen.find(Button);
     
      const note={title: "new title", category:"new category", content: "new content", date:"2020-04-22", time:"12:00"};
      appScreen.setState(note);
      button.simulate('click');

     /* const body = {
        title: title,
        content: content,
        category: category,
        date: date,
        time: time,
    }*/
      
      expect(addNote).toBeCalledWith(note);
      expect(addNote).toHaveBeenCalledTimes(1);
    });
});