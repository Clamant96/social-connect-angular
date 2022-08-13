import { Observable } from 'rxjs';
import { Postagem } from './../model/Postagem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

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

  getAllPostagensSeguidores(id: number): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.url}/usuarios/postagens-seguidores/${id}`, this.autorizacao);
  }

  getByIdPostagemUsuario(id: number): Observable<Postagem> {

    return this.http.get<Postagem>(`${this.url}/postagens/${id}`, this.autorizacao);
  }

  getAllByUsuarioPostagem(id: number) {

    return this.http.get<Postagem[]>(`${this.url}/postagens/postagensUsuario/${id}`, this.autorizacao);
  }

  postPostagemUsuario(postagem: Postagem): Observable<Postagem> {

    postagem.img = environment.nomeUplaodImagem;

    return this.http.post<Postagem>(`${this.url}/postagens`, postagem, this.autorizacao);
  }

  putPostagemUsuario(postagem: Postagem): Observable<Postagem> {

    postagem.img = environment.nomeUplaodImagem;

    return this.http.put<Postagem>(`${this.url}/postagens`, postagem, this.autorizacao);
  }

  likePostagem(idPostagem: number, idUsuario: number): Observable<Postagem> {

    return this.http.put<Postagem>(`${this.url}/postagens/likes_usuario_postagem/likePostagem/${idPostagem}/like/${idUsuario}`, this.autorizacao);
  }

  uploadImage(image: File): Observable<boolean> {
    const data: FormData = new FormData();

    data.append('type', image.type);
    data.append('file', image);
    data.append('contentType', image);
    data.append('empty', String(false));
    data.append('name', `${environment.username}/${image.name}`);
    data.append('originalFilename', `${environment.username}/${image.name}`);
    data.append('size', String(image.size));

    let nomeArquivo: string = String(this.getRandomInt(100000000, 999999999));

    environment.nomeUplaodImagem = `${nomeArquivo}.${image.name.split(".")[1]}`;

    return this.http.post<boolean>(`${this.url}/upload/${environment.username}/nomeArquivo/${nomeArquivo}`, data);
  }

  findImage(nomeUsuario: string, nomeImagem: string): Observable<File> {

    return this.http.get<File>(`${this.url}/image/carregar/${nomeUsuario}/${nomeImagem}`);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  deletaImagemSubstituida(nomeArquivo: string): Observable<boolean> {

    return this.http.delete<boolean>(`${this.url}/upload/${environment.username}/nomeArquivo/${nomeArquivo}`, this.autorizacao);
  }

}
