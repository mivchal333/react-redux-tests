import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { NotificationContainer } from 'react-notifications';

/*
kontrakt komponentu

1. Co renderuje komponent? 
2. Jakie właściwości przekazuje swoim komponentom potomnym?
3. Czy przechowuje on stan? Jaka jest zawartość stanu?
4. Jakie są możliwe interakcje użytkownika? Czy wpływają one na stan komponentu? Czy zmieniają renderowaną strukturę i jej zawartość?
*/

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            category: '',
            date: undefined,
            time: undefined, 
            redirect: false
        }
    }

    onChange(e) {
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    }

    onClick() {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div>
                        <h1>Add content to note</h1>
                        <p><textarea cols="50" rows="10" id="content" defaultValue={this.state.content} onChange={(e) => this.onChange(e)}></textarea></p>
                        <Button style={{ float: "right" }} variant="danger" onClick={onClose} >Close window</Button>
                    </div>
                );
            }
        });
    }

    add = () => {
        const { addNote } = this.props;
        const { title, content, category, date, time } = this.state;
        const body = {
            title: title,
            content: content,
            category: category,
            date: date,
            time: time,
        }
        addNote(body);
    }

    render() {
        return (
            <div className="contentToAddForm">
                
                <div className="header">ADD NOTE</div>
                <div className="addForm">
                    <div className="addFormRow">
                        <div className="addFormElement">
                            <label className="addFormLabel" >Title</label>
                            <input className="addFormInput" type="text" placeholder="Enter a title" id="title" onChange={(e) => this.onChange(e)} />
                        </div>

                        <div className="addFormElement">
                            <label className="addFormLabel">Category</label>
                            <input className="addFormInput" type="text" list="categoryList" id="category" placeholder="Enter a category" onChange={(e) => this.onChange(e)} />
                            <datalist id="categoryList">
                                <option>To do</option>
                                <option>Hobby</option>
                                <option>Work</option>
                                <option>Study</option>
                                <option>Gym</option>
                                <option>Favorites</option>
                            </datalist>
                        </div>
                    </div>

                    <div className="addFormRow" >
                        <div className="addFormElement" style={{ width: "100%" }}>
                            <label className="addFormLabel">Content</label>
                            <textarea className="addFormInput" type="text" rows="7" style={{ width: "100%" }} placeholder="Enter a content" id="content" onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>

                    <div className="addFormRow">
                        <div className="addFormElement">
                            <label className="addFormLabel">Date</label>
                            <input className="addFormInput" type="date" id="date" onChange={(e) => this.onChange(e)} />
                        </div>
                        <div className="addFormElement">
                            <label className="addFormLabel">Time</label>
                            <input className="addFormInput" type="time" id="time" onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="addFormRow">
                        <Button variant="secondary" style={{ width: "100%" }} onClick={this.add}>Add note</Button>
                    </div>
                </div>
            </div >
        );
    }
}


export default AddNote;