import { Seguindo } from './../model/Seguindo';
import { Postagem } from './../model/Postagem';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = environment.service + environment.port;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')
    //headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  getAllUsuariosParaSeguir(id: number): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.url}/usuarios/usuarios-para-seguidor/${id}`, this.autorizacao);
  }

  getByIdUsuario(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.url}/usuarios/${id}`, this.autorizacao);
  }

  getAllByUsernameUsuario(username: string) {

    return this.http.get<Usuario[]>(`${this.url}/usuarios/username/${username}`, this.autorizacao);
  }

  getAllUsuariosSeguidos(id: number) {

    return this.http.get<Usuario[]>(`${this.url}/usuarios/usuarios-seguidos/${id}`, this.autorizacao);
  }

  /* ENDPOINS SEGUINDO */
  seguirUsuario(idSeguindo: number, idSeguidor: number): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.url}/seguindo/lista_seguindo/${idSeguindo}/seguindo/${idSeguidor}`, this.autorizacao);
  }

  getByIdSeguindo(id: number): Observable<Seguindo> {

    return this.http.get<Seguindo>(`${this.url}/seguindo/${id}`, this.autorizacao);
  }

  getByUsernameUsuario(username: string): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.url}/usuarios/username/${username}`);
  }

  enviarEmail(usuario: Usuario): Observable<boolean> {

    return this.http.post<boolean>(`${this.url}/usuarios/email`, usuario);
  }

}
