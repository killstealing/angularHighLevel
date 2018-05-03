import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../domain/user.model';

@Injectable()
export class UserService {
  users: User[];

  constructor(private http: HttpClient) {
    this.users = [
      { id: 1, name: '张三' },
      { id: 1, name: '李四' },
      { id: 1, name: 'zhangsan' },
      { id: 1, name: 'lisi' },
      { id: 1, name: 'wangwu' }
    ];
  }

  getUsers(): Observable<User[]> {
    return this.http.get('/api/users') as Observable<User[]>;
  }

  getUsersByName(name: string): Observable<User[]> {
    return this.http.get(`/api/users/${name}`) as Observable<User[]>;
  }

}
