import apiConfiguration from './configureApi'

const api = {
    _path: '',

    collection(name) {
        this.entity(name)
        return this
    },

    one(name, id) {
        this._path  = this._path + '/' + name + '/' + id
        return this
    },

    entity(name) {
        this._path  = this._path + '/' + name
        return this
    },

    custom(path, method = 'GET') {
        this._path = path
        this._method = method
        return this
    },

    get(query) {
        if(query){
            this._path += '?' + query
        }
        this._method = 'GET'
        return this._makeRequest()
    },

    post(entity) {
        this._entity = entity
        this._method = 'POST'
        return this._makeRequest()
    },

    put(entity) {
        this._entity = entity
        this._method = 'PUT'
        return this._makeRequest()
    },

    delete() {
        this._method = 'DELETE'
        return this._makeRequest()
    },

    _makeRequest() {
        const params = {
            path: this._path,
            method: this._method,
            entity: this._entity
        }
        return apiConfiguration.api(params)
    }
}

export default api
