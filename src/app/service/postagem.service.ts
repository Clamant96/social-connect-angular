import { Observable } from 'rxjs';
import { Postagem } from './../model/Postagem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  public url = environment.service + environment.port;

  constructor(
    private http: HttpClient

  ) { }

  getAllByPostagensUsuarios() {

    return this.http.get<Postagem[]>(`${this.url}/postagens`);
  }

  getByIdPostagemUsuario(id: number): Observable<Postagem> {

    return this.http.get<Postagem>(`${this.url}/postagens/${id}`);
  }

  putPostagemUsuario(postagem: Postagem): Observable<Postagem> {

    return this.http.put<Postagem>(`${this.url}/postagens`, postagem);
  }

  adicionarlike(id: number) {

    return this.http.get(`${this.url}/postagens/adicionarlike/${id}`);
  }

}
