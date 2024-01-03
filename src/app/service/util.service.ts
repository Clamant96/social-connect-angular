import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public url: string = `${environment.service}${environment.port}`;

  constructor(
    private authService: AuthService,

  ) { }

  carregaImagem(username: string, img: string) {

    if(username == null || username == '' || img == null || img == '') {
      return '';
    }

    if(img.includes("person_perfil_vazio")) {

      return img;
    }

    // BASE 64
    username = this.encodeBytesToBase64(username);
    img = this.encodeBytesToBase64(img);

    return `${this.url}/image/carregar/${username}/${img}`;
  }

  encodeBytesToBase64(bytes: string) {
    const binString = btoa(bytes);
    return btoa(binString);
  }

  ajustaLike(postagem: Postagem, idUsuario: number) {
    let retorno: string = "";

    postagem.likePostagem.map((p) => {
      if(p.id == idUsuario) {
        retorno = "preenche-like";
      }

    });

    return retorno;
  }

  renderizaBotao(postagem: Postagem, idUsuario: number) {
    let retorno: boolean = false;

    postagem.likePostagem.map((p) => {
      if(p.id == idUsuario) {
        retorno = true;
      }

    });

    return retorno;
  }

  disponibilizaEdicaoPerfil(id: number, idLoop: number) {
    let trava: boolean = false;

    if(id == idLoop) {
      trava = true;

    }else {
      trava = false;

    }

    return trava;
  }

  logoutUsuario() {
    this.authService.logout();

  }

}
