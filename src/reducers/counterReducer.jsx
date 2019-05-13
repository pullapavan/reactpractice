import { ADD, REMOVE, REMOVE_ALL } from '../constants/constants';
import { combineReducers } from 'redux';

export default combineReducers({ reverseCounterReducer, taskReducer, loginReducer, counterReducer, playerReducer })

export function loginReducer(state = {}, action) {

    let storage = window.localStorage;
    switch (action.type) {
        case "LOGIN":
            storage.setItem("loggedIn", "Y");
            return { loggedIn: storage.getItem("loggedIn") };
        case "LOGOUT":
            storage.removeItem("loggedIn");
            return { loggedIn: storage.getItem("loggedIn") ? storage.getItem("loggedIn") : "NA" };
        default: return { loggedIn: storage.getItem("loggedIn") ? storage.getItem("loggedIn") : "NA" };
    }
}

export function playerReducer(state = {
    players: ['a', 'b', 'c','d','e'], ta: [], tb: [], processingPlayers: ['a', 'b', 'c','d','e']
}, action) {
    switch (action.type) {
        case "TA": var ta = [...state.ta];
            if (ta.length < 6) {
                ta = [...ta, action.name];
                return { ...state, ta ,status:'Y'};
            }
            return { ...state,status:'N' };

        case "TB": var tb = [...state.tb];
            if (tb.length < 6) {
                tb = [...tb, action.name];
                return { ...state, tb,status:'Y' };
            }
            return { ...state,status:'N' };

        case "RP": var processingPlayers = [...state.processingPlayers];
            var index = processingPlayers.indexOf(action.name);
            if (index !== -1) {
                processingPlayers.splice(index, 1)
                return { ...state, processingPlayers };
            }
            return { ...state };
        case "RTA": var ta = [...state.ta];
            var index = ta.indexOf(action.name);
            if (index !== -1) {
                ta.splice(index, 1)
                return { ...state, ta };
            }
            return { ...state };
        case "RTB": var tb = [...state.tb];
            var index = tb.indexOf(action.name);
            if (index !== -1) {
                tb.splice(index, 1)
                return { ...state, tb };
            }
            return { ...state };

        case "AP": var processingPlayers = [...state.processingPlayers, action.name];
            return { ...state, processingPlayers };



        default: return state;
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
            var dummy = [...state]
            dummy.splice(action.index,1);
            return [...dummy];
        case REMOVE_ALL: return [];
        default: return state;
    }
}
