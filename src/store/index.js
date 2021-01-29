import {
    createStore
} from 'vuex'

import prizes from './modules/prizes'
import auth from './modules/auth'


const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        prizes,
        auth
    },
    strict: debug
})