import { catchError, map, Observable, of, tap } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../products/interfaces/auth-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));

    private http = inject(HttpClient);

    checkStatusResource = rxResource({
        stream: () => this.checkStatus()
    });

    authStatus = computed(() => {
        if (this._authStatus() === 'checking') return 'checking';

        if (this._user()) {
            return 'authenticated';
        }

        return 'not-authenticated';
    });

    user = computed<User | null>(() => this._user());
    token = computed(this._token);
    isAdmin = computed(()=> this._user()?.roles.includes("admin") ?? false);


    login(email: string, password: string): Observable<boolean> {
        
        
    
        return this.http.post<AuthResponse>(`http://localhost:3000/api/auth/login`, {
            email: email,
            password: password
            
        }).pipe(
            map((resp) => this.handleAuthSucces(resp)),
            catchError((error: any) => this.handleAuthError(error))
        );

        
           
    }

    checkStatus(): Observable<boolean> {
        const token = localStorage.getItem('token')

        if (!token) {
            this.logout();
            return of(false);
        }

        return this.http.get<AuthResponse>(`http://localhost:3000/api/auth/check-status`, {
            // headers: {
            //     Authorization: `Bearer ${token}`
            // },
        }).pipe(         
            map((resp) => this.handleAuthSucces(resp)),
            
            catchError((error: any) => this.handleAuthError(error))
        )
    }

    logout() {
        this._user.set(null),
            this._token.set(null),
            this._authStatus.set('not-authenticated')

           
        localStorage.removeItem('token')
    }

    private handleAuthSucces({ token, user }: AuthResponse) {

        this._user.set(user);
        this._authStatus.set('authenticated');
        this._token.set(token);

        localStorage.setItem('token', token)

        return true;
    }

    private handleAuthError(error: any) {

        this.logout();
        return of(false);
    }

}