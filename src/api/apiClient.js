import apiConfiguration from './configureApi'
const apiModule = () => {
    let path = ''
    let method = 'GET'
    let entity = null

    const makeRequest = () => {
        const params = {
            path: path,
            method: method,
            entity: entity
        }
        return apiConfiguration.api(params)
    }

    return {
         api: {
            _path: '',

            collection(name) {
                this.entity(name)
                return this
            },

            one(name, id) {
                path  = path + '/' + name + '/' + id
                return this
            },

            entity(name) {
                path  = path + '/' + name
                return this
            },

            custom(url) {
                path = url
                return this
            },

            get(query) {
                if(query){
                    path += '?' + query
                }
                method = 'GET'
                return makeRequest()
            },

            post(body) {
                entity = body
                method = 'POST'
                return makeRequest()
            },

            put(body) {
                entity = body
                method = 'PUT'
                return makeRequest()
            },

            delete() {
                method = 'DELETE'
                return makeRequest()
            }
        }
    }
}

export default apiModule().api
