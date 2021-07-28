import { Observable } from 'rxjs';
import { Mensagem } from './../model/Mensagem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  public url = environment.service + environment.port;

  constructor(
    private http: HttpClient

  ) { }

  postMensagem(mensagem: Mensagem): Observable<Mensagem> {

    return this.http.post<Mensagem>(`${this.url}/mensagens`, mensagem);
  }

  putMensagem(mensagem: Mensagem): Observable<Mensagem> {

    return this.http.put<Mensagem>(`${this.url}/mensagens`, mensagem);
  }

}
