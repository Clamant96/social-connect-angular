import { UtilService } from 'src/app/service/util.service';
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

  public dropDownSeguindo: boolean = false;
  public dropDownPesquisa: boolean = false;

  constructor(
    public utilService: UtilService,

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.imgUsuario();

  }

  imgUsuario() {
    if(this.img == null) {
      this.img = 'assets/img/person_perfil_vazio.png';

    }

  }

  ajustarDropDown() {
    setTimeout(() => {
    // OCULTA DROPDOWN PESQUISA
      window.document.querySelector('.dropdown-content')?.setAttribute('style', 'display: none !important;');

    }, 1000);

  }

}
