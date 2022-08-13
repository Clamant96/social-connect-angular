import { Router } from '@angular/router';
import { Seguindo } from './../model/Seguindo';
import { UsuarioService } from './../service/usuario.service';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usarname = environment.username;
  public img = environment.img;
  public id: number = environment.id;
  public nomeSite = environment.nomeSite;
  public idUsuario = environment.id;

  public usuario: Usuario = new Usuario();
  public listaUsuario: Usuario[];
  public listaUsuariosSeguidos: Usuario[];

  public nomePesquisado: string;

  public postagem: Postagem = new Postagem();

  public url: string = `${environment.service}${environment.port}`;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.imgUsuario();

  }

  carregaImagem(username: string, img: string) {

    if(username == null || username == '' || img == null || img == '') {
      return '';
    }

    if(img.includes("person_perfil_vazio")) {

      return img;
    }

    return `${this.url}/image/carregar/${username}/${img}`;
  }

  minhaPesquisa(event: any) {
    this.nomePesquisado = event.target.value;

    this.pesquisa(this.nomePesquisado);

  }

  pesquisa(pesquisa: string) {
    window.document.querySelector('.dropdown-content')?.setAttribute('style', 'display: block;');

    this.authService.pesquisaUsuario(pesquisa).subscribe((resp: Usuario[]) => {
      this.listaUsuario = resp;

      console.log("Usuario: ");
      console.log(this.listaUsuario);

    });

    this.nomePesquisado = '';

  }

  imgUsuario() {
    if(this.img == null) {
      this.img = '../../assets/img/person_perfil_vazio.png';

    }

  }

  ajustarDropDown() {
    setTimeout(() => {
    // OCULTA DROPDOWN PESQUISA
      window.document.querySelector('.dropdown-content')?.setAttribute('style', 'display: none !important;');

    }, 1000);

  }

  ocultaListaSeguidores() {
    setTimeout(() => {
      // OCULTA DROPDOWN LISTA DE SEGUIDORES
      window.document.querySelector('.dropdown-lista-seguidores')?.setAttribute('style', 'display: none !important;');

    }, 100);

  }

  renderizaSeguidores(id: number) {
    window.document.querySelector('.dropdown-lista-seguidores')?.setAttribute('style', 'display: block;');

    this.usuarioService.getAllUsuariosSeguidos(id).subscribe((resp: Usuario[]) => {

      this.listaUsuariosSeguidos = resp;

    });

  }

  deixarDeSeguirUsuario(idSeguindo: number, idUsuarioLogado: number) {
    this.usuarioService.seguirUsuario(idSeguindo, idUsuarioLogado).subscribe(() => {

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar seguir o usuario!!');
      }
    });

    this.usuarioService.getAllUsuariosSeguidos(idUsuarioLogado).subscribe((resp: Usuario[]) => {

      this.listaUsuariosSeguidos = resp;

    });

    setTimeout(() => {

      if(window.document.URL.includes("home")) {
        this.router.navigate(['/pagina-inicial']);

      }else if(window.document.URL.includes("pagina-inicial")) {
        this.router.navigate(['/home']);

      }else if(window.document.URL.includes("meu-perfil")) {
        this.router.navigate(['/perfil/', this.id]);

      }else if(window.document.URL.includes("/perfil")) {

        let idUrl: number = Number(window.document.URL.split('/')[(window.document.URL.split('/').length - 1)]);

        this.router.navigate(['/meu-perfil/', idUrl]);

      }

    }, 1000);

    setTimeout(() => {
      // OCULTA DROPDOWN LISTA DE SEGUIDORES
      window.document.querySelector('.dropdown-lista-seguidores')?.setAttribute('style', 'display: none !important;');

    }, 1000);

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

}
