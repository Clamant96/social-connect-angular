import { Usuario } from './../model/Usuario';
import { UserLogin } from './../model/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = environment.service + environment.port;

  constructor(
    private http: HttpClient

  ) { }

  entrar(login: UserLogin): Observable<UserLogin> {

    return this.http.post<UserLogin>(`${this.url}/usuarios/logar`, login);
  }

  cadastrar(cadastro: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.url}/usuarios/cadastrar`, cadastro);
  }

  pesquisaUsuario(pesquisa: String): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.url}/usuarios/username/${pesquisa}`);
  }

  logado() {
    let login: Boolean = false;

    if(environment.token != '') {
      login = true;

    }

    return login;

  }

}
