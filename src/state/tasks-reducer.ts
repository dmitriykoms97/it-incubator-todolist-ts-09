import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    title: string
    taskId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone: boolean
    todolistId: string
}

const initialState: TasksStateType = {}

type initialStateType = typeof initialState;

type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id != action.taskId)
            return copyState;
        case ADD_TASK :
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case CHANGE_TASK_STATUS :
            return {...state, [action.todolistId]: state[action.todolistId].map(t => {
                if(t.id === action.taskId) {
                    return {...t, isDone: action.isDone}
                } else {
                    return t
                }
                })}
        case CHANGE_TASK_TITLE :
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ?
                    {...t, title: action.title}: t)}
        case ADD_TODOLIST: {
            return {...state, [action.todolistId]: []}
        }
        case REMOVE_TODOLIST: {
            let stateCopy = {...state};
            delete stateCopy[action.todolistId]
            return stateCopy
            /*return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.todolistId)}*/
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: REMOVE_TASK, taskId, todolistId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: ADD_TASK, title, todolistId  }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: CHANGE_TASK_STATUS, taskId, isDone, todolistId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: CHANGE_TASK_TITLE, title, todolistId, taskId }
}
