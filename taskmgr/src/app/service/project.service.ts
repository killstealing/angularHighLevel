import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project } from '../domain/project.model';

@Injectable()
export class ProjectService {

  projects: Project[];

  constructor(private http: HttpClient) {
    this.projects = [
      new Project(1, '企业协作平台1', '这是一个企业内部项目1', './../../../assets/img/covers/0.jpg'),
      new Project(2, '企业协作平台2', '这是一个企业内部项目2', './../../../assets/img/covers/1.jpg'),
      new Project(3, '企业协作平台3', '这是一个企业内部项目3', './../../../assets/img/covers/2.jpg'),
      new Project(4, '企业协作平台4', '这是一个企业内部项目4', './../../../assets/img/covers/3.jpg'),
      new Project(5, '企业协作平台5', '这是一个企业内部项目5', './../../../assets/img/covers/4.jpg'),
    ];
  }

  getProjects(): Observable<Project[]> {
    return this.http.get('/api/projects') as Observable<Project[]>;
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
