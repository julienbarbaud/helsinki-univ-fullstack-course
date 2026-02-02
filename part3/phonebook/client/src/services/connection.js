import axios from 'axios'

const baseUrl = "/api/persons"

const getAll = () => {
    return axios
        .get(baseUrl)
        .then((resp)=>resp.data)
}

const postNew = (person) => {
    return axios
        .post(baseUrl, person)
        .then((resp)=>resp.data)
}

const deleteId = (id) => {
    return axios
        .delete(baseUrl + `/${id}`)
        .then((resp)=>resp.data)
}

const updatePerson = (newPerson) => {
    console.log("updating ", newPerson)
    return axios
        .put(baseUrl + `/${newPerson.id}`, newPerson)
        .then((resp)=>resp.data)
}


export default {
    getAll,
    postNew,
    deleteId,
    updatePerson
}