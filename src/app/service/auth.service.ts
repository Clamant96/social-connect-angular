import { Usuario } from './../model/Usuario';
import { UserLogin } from './../model/UserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = environment.service + environment.port;

  autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  entrar(login: UserLogin): Observable<UserLogin> {

    return this.http.post<UserLogin>(`${this.url}/usuarios/logar`, login);
  }

  cadastrar(cadastro: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.url}/usuarios/cadastrar`, cadastro);
  }

  atualizar(atualizacao: Usuario): Observable<Usuario> {

    return this.http.put<Usuario>(`${this.url}/usuarios/atualizar`, atualizacao);
  }

  pesquisaUsuario(pesquisa: String): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.url}/usuarios/username/${pesquisa}`, this.autorizacao);
  }

  logado() {
    let login: Boolean = false;

    if(environment.token != '') {
      login = true;

    }

    return login;

  }

  logout() {
    environment.id = 0;
    environment.nome = '';
    environment.img = '';
    environment.biografia = '';
    environment.senha = '';
    environment.site = '';
    environment.token = '';
    environment.username = '';

    this.router.navigate(['/login']);

  }

}
