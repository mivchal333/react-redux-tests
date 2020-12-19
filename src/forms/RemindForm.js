import React, { Component } from 'react';
import * as Icon from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';

class RemindForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().getHours() + ":" + new Date().getMinutes(),
            date: new Date()
        }
    }

    formatStringDate() {
        const {addZero} = this.props;
        var dateToFormat = new Date(this.state.date);
        dateToFormat.setDate(dateToFormat.getDate());
        return dateToFormat.getFullYear() + "-" + addZero(dateToFormat.getMonth() + 1) + "-" + addZero(dateToFormat.getDate());
    }  

   

    onChange(e) {
        var name = e.target.id;
        this.setState({
            [name]: e.target.value,
        });
    }

    render() {
        const { onClose, note, remindNote } = this.props;
        
        return (
            <div className="alertForm">
                <span className="closeButton">
                    <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
                </span>
                <div className="importantInfoInAlert">
                    <Icon.Bell size={60} color="#999900" className="item" />
                    Remind:
            </div>
                <div>
                   
                    <div className="remindOption">
                        <span><input type="date" value={this.formatStringDate(this.state.date)} id="date" onChange={(e) => this.onChange(e, "")} /> at:</span>
                        <span className="remindTime" >
                            <input type="time" value={this.state.time} id="time" onChange={(e) => this.onChange(e, "")} />
                        </span>
                    </div>

                    <div className="noteRemindButton">
                        <Button variant="primary" disabled={!this.state.time} onClick={() => remindNote(note, this.formatStringDate(), this.state.time)}>Save</Button>
                    </div>

                </div>
            </div>
        );
    }
}

export default RemindForm;
