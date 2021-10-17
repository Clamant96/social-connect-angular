import { Observable } from 'rxjs';
import { Postagem } from './../model/Postagem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  public url = environment.service + environment.port;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')
    //headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  getAllByPostagensUsuarios() {

    return this.http.get<Postagem[]>(`${this.url}/postagens`, this.autorizacao);
  }

  getByIdPostagemUsuario(id: number): Observable<Postagem> {

    return this.http.get<Postagem>(`${this.url}/postagens/${id}`, this.autorizacao);
  }

  getAllByUsuarioPostagem(id: number) {

    return this.http.get<Postagem[]>(`${this.url}/postagens/postagensUsuario/${id}`, this.autorizacao);
  }

  postPostagemUsuario(postagem: Postagem): Observable<Postagem> {

    return this.http.post<Postagem>(`${this.url}/postagens`, postagem, this.autorizacao);
  }

  putPostagemUsuario(postagem: Postagem): Observable<Postagem> {

    return this.http.put<Postagem>(`${this.url}/postagens`, postagem, this.autorizacao);
  }

  likePostagem(idPostagem: number, idUsuario: number): Observable<Postagem> {

    return this.http.put<Postagem>(`${this.url}/postagens/likes_usuario_postagem/likePostagem/${idPostagem}/like/${idUsuario}`, this.autorizacao);
  }

}
