import { Story } from './../model/Story';
import { StoryService } from './../service/story.service';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/Usuario';
import { MensagemService } from './../service/mensagem.service';
import { environment } from './../../environments/environment.prod';
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
  listaDeStorys: Story[];

  mensagem: Mensagem = new Mensagem();
  minhasPostagens: Postagem = new Postagem();
  usuarioPostagem: Usuario = new Usuario();

  usuarioStorys: Usuario = new Usuario();

  usernameMensagem = environment.username;

  username = environment.username;
  nome = environment.nome;
  img = environment.img;
  idUsuarioLogado = environment.id;

  memoriaDesabilitado = 'none';
  memoriaAbilitado = 'none';

  key = 'data';
  reverse = true;

  constructor(
    private postagemService: PostagemService,
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private storyService: StoryService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    /*if(environment.token == '') {
      this.router.navigate(['/login']);

    }*/

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.findAllByStorys();
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

  findAllByStorys() {
    this.storyService.getAllByStorys().subscribe((resp: Story[]) => {
      this.listaDeStorys = resp;

      try{
        /* AGRUPA OS ITENS REPETIDOS DENTRO DO ARRAY */
        this.listaDeStorys = this.listaDeStorys.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.usuario.nome === item.usuario.nome
          ))
        )

      }catch(erro){
        //console.log('OCORREU UM ERRO AO AGRUPAR O ARRAY);

      }

    });

  }

  findByIdUsuario(id: number) {
    window.document.querySelector('#gerenciar-modal')?.setAttribute('style', 'display: block;');

    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuarioStorys = resp;

      console.log(this.usuarioStorys);

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('OCORREU UM ERRO AO TENTAR ABRIR O STORYS!!');
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

  seguirUsuario(idSeguindo: number, idSeguidor: number) {
    this.usuarioService.seguirUsuario(idSeguindo, idSeguidor).subscribe(() => {

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar seguir o usuario!!');
      }
    });
  }

}
