import { Observable } from 'rxjs';
import { Mensagem } from './../model/Mensagem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  public url = environment.service + environment.port;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')
    //headers: new HttpHeaders().set('Authorization', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  postMensagem(mensagem: Mensagem): Observable<Mensagem> {

    return this.http.post<Mensagem>(`${this.url}/mensagens`, mensagem, this.autorizacao);
  }

  putMensagem(mensagem: Mensagem): Observable<Mensagem> {

    return this.http.put<Mensagem>(`${this.url}/mensagens`, mensagem, this.autorizacao);
  }

}
