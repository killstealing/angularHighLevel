import { covertArrToObj, buildObjFromArr } from './../utils/reduer.util';
import { Task } from './../domain/task.model';
import * as actions from '../actions/task.action';
import * as projectAction from '../actions/project.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TaskState {
    tasks: Task[];
    ids: string[];
    entities: { [id: string]: Task };
}

export const initialState: TaskState = {
    tasks: [],
    ids: [],
    entities: {}
};

const addTask = (state, action) => {
    const task = action.payload;
    console.log(task);
    if (state.entities[task.id]) {
        return state;
    }
    const newIds = [...state.ids, task.id];
    const newEntities = { ...state.entities, [task.id]: task };
    // return { ...state, ids: ids, entities: entities, selectedId: task.id };
    return { ...state, ids: newIds, entities: newEntities, tasks: [...state.tasks, task] };
};

const updateTask = (state, action) => {
    const task = action.payload;
    const newEntities = { ...state.entities, [task.id]: task };
    const newTasks = state.projects.filter(p => p.id !== task.id);
    return { ...state, entities: newEntities, tasks: [...newTasks, task] };
};

const deleteTask = (state, action) => {
    const task = action.payload;
    const newIds = state.ids.filter(id => id !== task.id);
    const newEntities = buildObjFromArr(newIds, state.entities);
    const newTasks = state.projects.filter(p => p.id !== task.id);
    return { tasks: newTasks, ids: newIds, entities: newEntities, selectedId: [] };
};

const loadTasks = (state, action) => {
    const tasks = action.payload;
    if (tasks === null) {
        return state;
    }
    const newTasks = tasks.filter(task => !state.entities[task.id]);
    const newIds = newTasks.map(task => task.id);
    if (newTasks.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(newTasks);
    return {
        tasks: newTasks,
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

export function reducer(state = initialState, action: actions.Actions): TaskState {
    switch (action.type) {
        case actions.ActionTypes.ADD_SUCCESS: {
            return addTask(state, action);
        }
        case actions.ActionTypes.DELETE_SUCCESS: {
            return deleteTask(state, action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS: {
            return updateTask(state, action);
        }
        case actions.ActionTypes.LOAD_SUCCESS: {
            return loadTasks(state, action);
        }
        case projectAction.ActionTypes.SELECT_PROJECT: {
            return selectPrj(state, action);
        }
        default: {
            return state;
        }
    }
}

