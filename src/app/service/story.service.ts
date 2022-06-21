import { Story } from './../model/Story';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  public url = environment.service + environment.port;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')
    //headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  getAllByStorys(): Observable<Story[]> {

    return this.http.get<Story[]>(`${this.url}/story`, this.autorizacao);
  }

  getAllStorysSeguidores(id: number): Observable<Story[]> {

    return this.http.get<Story[]>(`${this.url}/usuarios/storys-seguidores/${id}`, this.autorizacao);
  }

  getByIdStory(id: number): Observable<Story> {

    return this.http.get<Story>(`${this.url}/story/${id}`, this.autorizacao);
  }

  postStory(story: Story): Observable<Story> {

    return this.http.post<Story>(`${this.url}/story`, story, this.autorizacao);
  }

  putStory(story: Story): Observable<Story> {

    return this.http.put<Story>(`${this.url}/story`, story, this.autorizacao);
  }

  deleteStory(id: number) {

    return this.http.delete(`${this.url}/story/${id}`, this.autorizacao);
  }

}
