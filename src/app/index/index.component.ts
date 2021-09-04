import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/Usuario';
import { MensagemService } from './../service/mensagem.service';
import { environment } from './../../environments/environment';
import { Mensagem } from './../model/Mensagem';
import { PostagemService } from './../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  listaDePostagens: Postagem[];
  listaDeUsuarios: Usuario[];

  mensagem: Mensagem = new Mensagem();
  minhasPostagens: Postagem = new Postagem();
  usuarioPostagem: Usuario = new Usuario();

  usernameMensagem = environment.username;

  username = environment.username;
  nome = environment.nome;
  img = environment.img;
  idUsuarioLogado = environment.id;

  memoriaDesabilitado = 'none';
  memoriaAbilitado = 'none';

  constructor(
    private postagemService: PostagemService,
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    this.findAllByPostagensUsuarios();
    this.findAllByUsuarios();
    this.imgUsuario();

  }

  findAllByPostagensUsuarios() {
    this.postagemService.getAllByPostagensUsuarios().subscribe((resp: Postagem[]) => {
      this.listaDePostagens = resp;

    });

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagemUsuario(id).subscribe((resp: Postagem) => {
      this.minhasPostagens = resp;

      this.usuarioService.getByIdUsuario(resp.usuario.id).subscribe((resp: Usuario) => {
        this.usuarioPostagem = resp;

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('Ocorreu um erro ao tentar vizualizar a postagem!');

        }

      });

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar abrir a postagem!');

      }

    });

  }

  findAllByUsuarios() {
    this.usuarioService.getAllByUsuarios().subscribe((resp: Usuario[]) => {

      for(let i = 0; i < resp.length; i++) {
        if(resp[i].img == null) {
          resp[i].img = '../../assets/img/person_perfil_vazio.png';

        }

      }

      this.listaDeUsuarios = resp;

    }, erro => {
      if(erro.status == 500) {
        alert('Ocorreu um erro ao tentar carregar os usuarios!');

      }

    });

  }

  postMensagemPostagem(idPostagem: number) {
    this.mensagem.username = environment.username;

    /* ACESSA O OBJETO TEMA(ID), E DENTRO DELE INSERE O DADO VINDO DA OPCAO ESCOLHIDA PELO USUARIO */
    this.minhasPostagens.id = idPostagem;
    /* INSERE O ID DE TEMA DENTRO DE POSTAGEM(TEMA) */
    this.mensagem.postagem = this.minhasPostagens;

    this.mensagemService.postMensagem(this.mensagem).subscribe((resp: Mensagem) => {
      this.mensagem = resp;

      this.findAllByPostagensUsuarios();

      this.mensagem = new Mensagem();

    }, erro => {
      if(erro.status == 500) {
        alert('O correu um erro ao tentar realizar o comentarios!');

      }

    });

  }

  likePostagem(idUsuario: number, idPostagem: number) {
    this.postagemService.likePostagem(idUsuario, idPostagem).subscribe(() => {
      this.findAllByPostagensUsuarios();

    });

  }

  logoutUsuario() {
    this.authService.logout();

  }

  imgUsuario() {
    if(this.img == null) {
      this.img = '../../assets/img/person_perfil_vazio.png';

    }

  }

}
