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

  autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  getAllByUsuarios() {

    return this.http.get<Usuario[]>(`${this.url}/usuarios`, this.autorizacao);
  }

  getByIdUsuario(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.url}/usuarios/${id}`, this.autorizacao);
  }

  getAllByUsernameUsuario(username: string) {

    return this.http.get<Usuario[]>(`${this.url}/usuarios/username/${username}`, this.autorizacao);
  }

}
