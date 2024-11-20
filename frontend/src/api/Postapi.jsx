import axios from 'axios'

const api = axios.create({
    baseURL: "https://starbot.pythonanywhere.com/api"
});

// Get Method

export const getContacts = () => {
    return api.get("/contacts/?format=json");
}

// Delete Http Request 

export const deletePost = (id) => {
    return api.delete(`/contacts/${id}/`)
}

// Post HTTP Request

export const addPost = (contact) => {
    console.log(contact);
    return api.post("/contacts/", contact)
}


/// Put HTTP Request 

export const updateData = (id, contact) => {
    console.log("id", id);
    console.log(contact)
    return api.put(`/contacts/${id}/`, contact)
}
