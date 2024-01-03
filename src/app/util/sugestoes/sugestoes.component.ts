import { Router } from '@angular/router';
import { UtilService } from './../../service/util.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.css']
})
export class SugestoesComponent implements OnInit {

  @Output() atualizaVisualizacaoUsuario = new EventEmitter<boolean>();

  public username = environment.username;
  public nome = environment.nome;
  public img = environment.img;
  public idUsuarioLogado = environment.id;

  public listaDeUsuarios: Usuario[];

  constructor(
    private router: Router,
    public utilService: UtilService,
    private usuarioService: UsuarioService,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    if(this.idUsuarioLogado > 0) {
      this.findAllUsuariosParaSeguir(this.idUsuarioLogado);

    }


  }

  pushAtualizaVisualizacaoUsuario(status: boolean) {
    this.atualizaVisualizacaoUsuario.emit(status);

  }

  findAllUsuariosParaSeguir(id: number) {
    this.listaDeUsuarios = [];

    this.usuarioService.getAllUsuariosParaSeguir(id).subscribe((resp: Usuario[]) => {
      this.listaDeUsuarios = resp;

    }, erro => {
      if(erro.status == 500) {
        alert('Ocorreu um erro ao tentar carregar os usuarios!');

      }

    });

  }

  seguirUsuario(idSeguindo: number, idSeguidor: number) {
    this.usuarioService.seguirUsuario(idSeguindo, idSeguidor).subscribe(() => {

      this.pushAtualizaVisualizacaoUsuario(true);

      setTimeout(() => {
        this.findAllUsuariosParaSeguir(this.idUsuarioLogado);

      }, 1000);

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar seguir o usuario!!');
      }
    });

  }

}
