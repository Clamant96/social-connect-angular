import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usarname = environment.username;
  img = environment.img;
  nomeSite = environment.nomeSite;
  idUsuario = environment.id;

  usuario: Usuario = new Usuario();
  listaUsuario: Usuario[];

  nomePesquisado: string;

  postagem: Postagem = new Postagem();

  constructor(
    private authService: AuthService

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.imgUsuario();

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
    window.document.querySelector('.dropdown-content')?.setAttribute('style', 'display: none !important;');
  }

}
