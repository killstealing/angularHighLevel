import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Project, User } from '../domain';
import { switchMap, map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new Headers({
        'Content-type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

    // POST
    add(project: Project): Observable<Project> {
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(project), { headers: this.headers })
            .map(res => res.json());
    }

    // PUT
    update(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
            .map(res => res.json());
    }

    // delete
    del(project: Project): Observable<Project> {
        const delTasks$ = Observable.from(project.taskLists ? project.taskLists : [])
            .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
            .count();
        return delTasks$.switchMap(_t => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
            .mapTo(project);
    }

    // get
    get(userId: string): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {
                params: { 'members_like': userId }
            })
            .map(res => res.json() as Project);
    }

    // PUT
    inviteMembers(projectId: string, users: User[]) {
        const uri = `${this.config.uri}/${this.domain}/${projectId}`;
        return this.http.get(uri)
            .pipe(
            map(res => res.json() as Project),
            switchMap((project: Project) => {
                const existingMemberIds = project.members;
                const invitedIds = users.map(user => user.id);
                const newIds = _.union(existingMemberIds, invitedIds);
                return this.http.patch(uri, JSON.stringify({ members: newIds }),
                    { headers: this.headers });
            }));
    }
}
