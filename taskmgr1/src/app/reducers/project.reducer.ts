import { covertArrToObj, buildObjFromArr } from './../utils/reduer.util';
import { Project } from './../domain/project.model';
import * as actions from '../actions/project.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProjectState {
    projects: Project[];
    ids: string[];
    entities: { [id: string]: Project };
    selectedId: string | null;
}

export const initialState: ProjectState = {
    projects: [],
    ids: [],
    entities: {},
    selectedId: null,
};

const addProject = (state, action) => {
    const project = action.payload;
    if (state.entities[project.id]) {
        return state;
    }
    const newIds = [...state.ids, project.id];
    const newEntities = { ...state.entities, [project.id]: project };
    // return { ...state, ids: ids, entities: entities, selectedId: project.id };
    return { ...state, ids: newIds, entities: newEntities, projects: [...state.projects, project] };
};

const updateProject = (state, action) => {
    const project = action.payload;
    const newEntities = { ...state.entities, [project.id]: project };
    const newProjects = state.projects.filter(p => p.id !== project.id);
    return { ...state, entities: newEntities, projects: [...newProjects, project] };
};

const deleteProject = (state, action) => {
    const project = action.payload;
    const newIds = state.ids.filter(id => id !== project.id);
    const newEntities = buildObjFromArr(newIds, state.entities);
    const newProjects = state.projects.filter(p => p.id !== project.id);
    return { projects: newProjects, ids: newIds, entities: newEntities, selectedId: null };
};

const loadProjects = (state, action) => {
    const projects = action.payload;
    if (projects === null) {
        return state;
    }
    const newProjects = projects.filter(project => !state.entities[project.id]);
    const newIds = newProjects.map(project => project.id);
    if (newProjects.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(newProjects);
    console.log('newProjects', newProjects);
    return {
        projects: newProjects,
        ids: [...state.ids, ...newIds],
        entities: { ...state.entities, ...newEntities },
        selectedId: null
    };
};

export function reducer(state = initialState, action: actions.Actions): ProjectState {
    switch (action.type) {
        case actions.ActionTypes.ADD_SUCCESS: {
            return addProject(state, action);
        }
        case actions.ActionTypes.DELETE_SUCCESS: {
            return deleteProject(state, action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS: {
            return updateProject(state, action);
        }
        case actions.ActionTypes.LOAD_SUCCESS: {
            return loadProjects(state, action);
        }
        case actions.ActionTypes.SELECT_PROJECT: {
            return { ...state, selectedId: action.payload.id };
        }
        default: {
            return state;
        }
    }
}

