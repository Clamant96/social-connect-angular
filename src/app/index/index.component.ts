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
  postagem: Postagem = new Postagem();

  usernameMensagem = environment.username;

  username = environment.username;
  nome = environment.nome;
  img = environment.img;
  idUsuarioLogado = environment.id;

  constructor(
    private postagemService: PostagemService,
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    this.findAllByPostagensUsuarios();
    this.findAllByUsuarios();

  }

  findAllByPostagensUsuarios() {
    this.postagemService.getAllByPostagensUsuarios().subscribe((resp: Postagem[]) => {
      this.listaDePostagens = resp;

    });
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagemUsuario(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

    });
  }

  findAllByUsuarios() {
    this.usuarioService.getAllByUsuarios().subscribe((resp: Usuario[]) => {
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
    this.postagem.id = idPostagem;
    /* INSERE O ID DE TEMA DENTRO DE POSTAGEM(TEMA) */
    this.mensagem.postagem = this.postagem;

    this.mensagemService.postMensagem(this.mensagem).subscribe((resp: Mensagem) => {
      this.mensagem = resp;

      this.findAllByPostagensUsuarios();

      //this.postagem = new Postagem();

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

}
