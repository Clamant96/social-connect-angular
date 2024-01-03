import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UtilService } from 'src/app/service/util.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  public id: number = environment.id;

  public dropDownSeguindo: boolean = false;

  public listaUsuariosSeguidos: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    public utilService: UtilService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

  }

  gerenciaOcultaListaSeguidores() {
    this.dropDownSeguindo = !this.dropDownSeguindo;

  }

  renderizaSeguidores(id: number) {
    this.gerenciaOcultaListaSeguidores();

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

}
