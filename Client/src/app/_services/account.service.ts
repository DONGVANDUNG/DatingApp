import { environment } from './../../environments/environment';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1); //để lưu người dùng đăng nhâpk vào hệ thống
  currentUser$ = this.currentUserSource.asObservable(); //người dùng không thể truy cập đến các thuộc tính next ở sau
  constructor(private http: HttpClient) {}
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles); //nếu là 1 mảng thì gán cho mảng ban đầu, còn nếu là 1 chuỗi thì push vào mảng ban đầu
    this.currentUserSource.next(user); //trỏ đến user hiện tại
    localStorage.setItem('user', JSON.stringify(user)); //lưu user đó vào localstorage với key là 'user'
  }

  logout() {
    localStorage.removeItem('user'); //xóa key 'user' tức là xóa người dùng hiện tại
    this.currentUserSource.next(null!); //xóa biến lưu trữ trong ReplaySubject
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1])); //giải mã 1 chuỗi được mã hóa
  }
}
