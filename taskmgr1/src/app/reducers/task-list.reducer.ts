import { covertArrToObj, buildObjFromArr } from './../utils/reduer.util';
import { TaskList } from './../domain/task-list.model';
import * as actions from '../actions/task-list.action';
import * as projectAction from '../actions/project.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TaskListState {
    taskLists: TaskList[];
    ids: string[];
    entities: { [id: string]: TaskList };
    selectedId: string[];
}

export const initialState: TaskListState = {
    taskLists: [],
    ids: [],
    entities: {},
    selectedId: null
};

const addTaskList = (state, action) => {
    const taskList = action.payload;
    console.log(taskList);
    if (state.entities[taskList.id]) {
        return state;
    }
    const newIds = [...state.ids, taskList.id];
    const newEntities = { ...state.entities, [taskList.id]: taskList };
    // return { ...state, ids: ids, entities: entities, selectedId: taskList.id };
    return { ...state, ids: newIds, entities: newEntities, taskLists: [...state.taskLists, taskList] };
};

const updateTaskList = (state, action) => {
    const taskList = action.payload;
    const newEntities = { ...state.entities, [taskList.id]: taskList };
    const newTaskLists = state.projects.filter(p => p.id !== taskList.id);
    return { ...state, entities: newEntities, taskLists: [...newTaskLists, taskList] };
};

const deleteTaskList = (state, action) => {
    const taskList = action.payload;
    const newIds = state.ids.filter(id => id !== taskList.id);
    const newEntities = buildObjFromArr(newIds, state.entities);
    const newTaskLists = state.projects.filter(p => p.id !== taskList.id);
    return { taskLists: newTaskLists, ids: newIds, entities: newEntities, selectedId: [] };
};

const loadTaskLists = (state, action) => {
    const taskLists = action.payload;
    if (taskLists === null) {
        return state;
    }
    const newTaskLists = taskLists.filter(taskList => !state.entities[taskList.id]);
    const newIds = newTaskLists.map(taskList => taskList.id);
    if (newTaskLists.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(newTaskLists);
    return {
        taskLists: newTaskLists,
        ids: [...state.ids, ...newIds],
        entities: { ...state.entities, ...newEntities },
        selectedId: null
    };
};

const selectPrj = (state, action) => {
    const selected = action.payload;
    const selectedIds = state.ids.filter(id =>
        state.entities[id].projectId === selected.id);
    return {
        ...state, selectedIds: selectedIds
    };
};

export function reducer(state = initialState, action: actions.Actions): TaskListState {
    switch (action.type) {
        case actions.ActionTypes.ADD_SUCCESS: {
            return addTaskList(state, action);
        }
        case actions.ActionTypes.DELETE_SUCCESS: {
            return deleteTaskList(state, action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS: {
            return updateTaskList(state, action);
        }
        case actions.ActionTypes.LOAD_SUCCESS: {
            return loadTaskLists(state, action);
        }
        case projectAction.ActionTypes.SELECT_PROJECT: {
            return selectPrj(state, action);
        }
        default: {
            return state;
        }
    }
}

