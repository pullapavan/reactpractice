import { ADD, REMOVE, REMOVE_ALL } from '../constants/constants';
import { combineReducers } from 'redux';

export default combineReducers({  reverseCounterReducer, taskReducer, loginReducer, counterReducer })

export function loginReducer(state = {}, action) {
    
    let storage = window.localStorage;
    switch (action.type) {         
        case "LOGIN":
            storage.setItem("loggedIn", "Y");
            return { loggedIn: storage.getItem("loggedIn")};
        case "LOGOUT":
            storage.removeItem("loggedIn");
            return { loggedIn: storage.getItem("loggedIn")?storage.getItem("loggedIn"):"NA"};
        default: return { loggedIn: storage.getItem("loggedIn")?storage.getItem("loggedIn"):"NA"};
    }
}

export function counterReducer(state = 0, action) {
   
    switch (action.type) {
        case "I": return state + 1;
        case "D": return state - 1;
        case "R": return 0;
        default: return state;
    }

}
export function reverseCounterReducer(state = 0, action) {
    
    switch (action.type) {
        case "I": return state - 1;
        case "D": return state + 1;
        case "R": return 0;
        default: return state;
    }

}

export function taskReducer(state = [], action) {
    
    switch (action.type) {
        case ADD: return [...state, action.task];
        case REMOVE:
            return [...state.splice(0, action.index), ...state.splice(action.index)];
        case REMOVE_ALL: return [];
        default: return state;
    }
}
