import {combineReducers} from 'redux'
import userReducer from './userReducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const PersistConfig = {
    key:"root",
    storage,
}

const rootReducer = combineReducers({
    user:userReducer,

})

export default persistReducer(PersistConfig,rootReducer)