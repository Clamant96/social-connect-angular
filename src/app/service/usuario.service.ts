import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = environment.service + environment.port;

  constructor(
    private http: HttpClient

  ) { }

  getAllByUsuarios() {

    return this.http.get<Usuario[]>(`${this.url}/usuarios`);
  }

}
