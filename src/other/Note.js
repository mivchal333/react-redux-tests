import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-bootstrap-icons";
 
const Note = props => {
  const { note, content, showEditForm, showDeleteForm, showDetailForm, showChangeNoteStatusForm, showRemindForm } = props;
  
  var noteStatus = note.status ? "done" : "";
  return (
    <tr>
      <td style={{ verticalAlign: "middle" }} className={noteStatus}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          {note.title}
          {note.date != null ?
            <b>
              {note.date} ({note.time}) <Icon.AlertTriangle color="#FF5d00" size={32} />
            </b>
            : null
          }
        </div>
      </td>
      <td style={{ borderBottom: "none" }} className={noteStatus}><div>{note.category}
        {
          note.category === "To do" ? (
            <Icon.ListCheck size={66} />
          ) : (
              <Icon.DocumentText size={66} />
            )}
      </div>
      </td>
      <td style={{ verticalAlign: "middle" }} className={noteStatus}><div>{content}</div></td>
      <td>
        <div className="justifyRow">
          <div className="justifyColumn">
            {
              note.status !== '' &&
              <div style={{ display: "block", verticalAlign: note.status ? "middle" : "none" }} onClick={() => showChangeNoteStatusForm(note)}>
                {note.status ?
                  <Icon.XCircle size={32} color="red" className="item" /> : <Icon.CheckCircle size={32} color="green" className="item" />}
                {note.status ?
                  <i>Undone</i> : <i>Done</i>}
              </div>
            }
            <div style={{width: "100px"}}>
              
            </div>
            
          </div>
          <div className="justifyColumn">
 
            <div style={{ display: "block" }} onClick={() => showRemindForm(note)}>
              <Icon.Bell size={32} color="#999900" className="item" />
              <i>Remind </i>
            </div>
            <div onClick={() => showDetailForm(note)}>
              <Icon.List size={30} color="green" className="item" />
              <i>Detail </i>
            </div>
            
          </div>
 
          <div className="justifyColumn">
           
            <div onClick={() => showDeleteForm(note)}>
              <Icon.Trash size={30} color="black" className="item" />
              <i>Delete </i>
            </div>
            <div onClick={() => showEditForm(note)}>
              <Icon.Pencil size={30} color="blue" className="item" />
              <i>Edit </i>
            </div>
          </div>
 
        </div>
      </td>
    </tr >
  );
};
 
Note.propTypes = {
  title: function (props, propName) {
    if (props.note[propName] === null || props.note[propName].length < 3) {
      return new Error(propName + " was too short");
    }
  },
  category: PropTypes.string,
  content: PropTypes.string,
};

 
export default Note;