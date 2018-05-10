import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project } from '../domain/project.model';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ProjectService {
  private handleError: HandleError;
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ProjectService');
  }

  getProjects() {
    return this.http.get('/api/projects').pipe(
      catchError(this.handleError('getProjects'))
    );
  }

  doInsert(project: Project) {
    return this.http.post('/api/project', project) as Observable<Project[]>;
  }

  doUpdate(project: Project) {
    return this.http.put('/api/project', project) as Observable<Project[]>;
  }

  doDel(id: number) {
    return this.http.delete(`/api/project/${id}`) as Observable<Project[]>;
  }

}
