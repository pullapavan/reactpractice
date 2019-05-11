import { ADD, REMOVE, REMOVE_ALL } from "../constants/constants";
export const increment = () => {
    return { type: "I" }

}
export const decrement = () => {
    return { type: "D" }

}
export const refresh = () => {
    return { type: "R" }

}
export const ta = (name)=>{
    return {
        type : "TA", name
    }
}
export const tb = (name)=>{
    return{
        type : "TB", name
    }
}
export const addToMainList = (name)=>{
    return {
        type : "AP", name
    }
}
export const removeFromList = (name)=>{
    return{
        type : "RP", name
    }
}
export const removeFromTa = (name)=>{
    return{
        type : "RTA", name
    }
}
export const removeFromTb = (name)=>{
    return{
        type : "RTB", name
    }
}
export const addTask = (task) => {
    return {
        type: ADD,
        task: task
    }
}
export const removeTask = (index) =>{
    return{
        type:REMOVE,
        index:index
    }
}
export const removeAll = ()=>{
    return{
        type:REMOVE_ALL
    }
}
export const login = ()=>{
    return{
        type:"LOGIN"
    }
}
export const logout = ()=>{
    return{
        type:"LOGOUT"
    }
}