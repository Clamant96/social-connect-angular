import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public url: string = `${environment.service}${environment.port}`;

  constructor(
    private authService: AuthService,
    private router: Router,

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

  validaData(dataStory: Date) {

    const dataAtual = new Date().toLocaleDateString();

    const conversaoDataStory = new Date(dataStory).toLocaleDateString('pt-BR');

    if(conversaoDataStory == dataAtual ) {

      return true;
    }else {

      return false;
    }

  }

  carregaImagemStory(dado: string) {

    if(dado == null || dado == '') {
      return '';
    }

    if(dado.includes("person_perfil_vazio")) {

      return dado;
    }

    let infoUsuario: string[] = dado.split('/');

    // BASE 64
    let username: string = this.encodeBytesToBase64(infoUsuario[0]);
    let img: string = this.encodeBytesToBase64(infoUsuario[1]);

    return `${this.url}/image/carregar/${username}/${img}`;
  }

  verificaFrase(usuario: Usuario, id: number) {

    let isSeguindo: boolean = false;

    try {

      usuario.seguindo.listaDeSeguindo.map((item) => {

        if(item.id == id) {
          isSeguindo = true;
        }

      });

    }catch{}

    if(isSeguindo) {
      return "Deixar de seguir";
    }else {
      return "Seguir";
    }
  }

  defineUrlPerfilUsuarioLogado() {

    let retorno: string = "/meu-perfil/";

    if(window.document.URL.includes("meu-perfil")) {
      retorno = "/perfil/";

    }else if(window.document.URL.includes("/perfil")) {
      retorno = "/meu-perfil/";

    }

    return retorno;
  }

  defineUrlRoteamentoGerenciamentoDeCarregamento(id: number) {

    if(window.document.URL.includes("home")) {
      this.router.navigate(['/pagina-inicial']);

    }else if(window.document.URL.includes("pagina-inicial")) {
      this.router.navigate(['/home']);

    }else if(window.document.URL.includes("meu-perfil")) {
      this.router.navigate(['/perfil/', id]);

    }else if(window.document.URL.includes("/perfil")) {

      let idUrl: number = Number(window.document.URL.split('/')[(window.document.URL.split('/').length - 1)]);

      this.router.navigate(['/meu-perfil/', idUrl]);

    }

  }

}
