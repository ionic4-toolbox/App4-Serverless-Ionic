import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  
  loggedIn: BehaviorSubject<boolean>;
  password: String;
  http: any;

  constructor() {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }
 
  /** サインアップ */
  public signUp(username, password, email): Observable<any> {
    this.password = password;
    return from(Auth.signUp({ 
      username: username, 
      password: password, 
      attributes: {
        'email': email
      }
    }));
  }
 
  /** 検証 */
  public confirmSignUp(email, code): Observable<any> {
    return from(Auth.confirmSignUp(email, code));
  }
 
  /** ログイン */
  public signIn(email, password): Observable<any> {
    return from(Auth.signIn(email, password)).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }
 
  /** ログインユーザ情報の取得 */
  public getData(): Observable<any> {
    return from(Auth.currentAuthenticatedUser());
  }

  /** ユーザ名を取得 */
  public getUserName(): string {
    return Auth.currentSession()['__zone_symbol__value']['accessToken']['payload']['username'];
  }

  /** メールアドレスを取得 */
  public getEmailAddress(): string {
    return Auth.currentSession()['__zone_symbol__value']['idToken']['payload']['email'];
  }
 
  /** idtokenを取得 */
  public getIdToken(): string {
    return Auth.currentSession()['__zone_symbol__value']['idToken']['jwtToken'];
  }
 
  /** ログイン状態の取得 */
  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(result => {
        this.loggedIn.next(true);
        return true;
      }),
      catchError(error => {
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }
 
  /** ログアウト */
  public signOut() {
    from(Auth.signOut()).subscribe(
      result => {
        this.loggedIn.next(false);
      },
      error => console.log(error)
    );
  }
}
