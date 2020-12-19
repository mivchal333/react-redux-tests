import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:7777/';

export const getAllNotes = () => {
    return axios.get('notes')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getNoteById = (id) => {
    return axios.get('note/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getNotesByDate = (date) => {
    return axios.get("/date/" + date)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const addNote = (body) => {
    return axios.post("/note", body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const editNote = (id, body) => {
    return axios.put("/note/" + id, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const deleteNote = (id) => {
    return axios.delete("/note/" + id)
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}