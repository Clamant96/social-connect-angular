import { Observable } from 'rxjs';
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
  public listaDeStorys: Story[];

  public mensagem: Mensagem = new Mensagem();
  public minhasPostagens: Postagem = new Postagem();
  public usuarioPostagem: Usuario = new Usuario();

  public usuarioStorys: Usuario = new Usuario();

  public usernameMensagem = environment.username;

  public username = environment.username;
  public nome = environment.nome;
  public img = environment.img;
  public idUsuarioLogado = environment.id;

  public memoriaDesabilitado = 'none';
  public memoriaAbilitado = 'none';

  public key = 'data';
  public reverse = true;

  public url: string = `${environment.service}${environment.port}`;

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

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    if(this.idUsuarioLogado > 0) {
      this.findAllStorysSeguidores(this.idUsuarioLogado);
      this.findAllPostagensSeguidores(this.idUsuarioLogado);
      this.findAllUsuariosParaSeguir(this.idUsuarioLogado);

    }else {
      this.router.navigate(['/login']);

    }

  }

  validaData(dataStory: Date) {

    const dataAtual = new Date().toLocaleDateString();

    const conversaoDataStory = new Date(dataStory).toLocaleDateString('en-US');

    console.log("dataStory: "+ conversaoDataStory);
    console.log("dataAtual: "+ dataAtual);

    if(conversaoDataStory == dataAtual ) {

      return true;
    }else {

      return false;
    }

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

  carregaImagemStory(img: string) {

    if(img == null || img == '') {
      return '';
    }

    if(img.includes("person_perfil_vazio")) {

      return img;
    }

    return `${this.url}/image/carregar/${img}`;
  }

  findAllPostagensSeguidores(id: number) {
    this.postagemService.getAllPostagensSeguidores(id).subscribe((resp: Postagem[]) => {
      this.listaDePostagens = resp;

    });

  }

  findByIdPostagem(id: number) {
    this.usuarioPostagem = new Usuario();

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

  findAllStorysSeguidores(id: number) {
    this.storyService.getAllStorysSeguidores(id).subscribe((resp: Story[]) => {
      this.listaDeStorys = resp;

      /*
        var resultProductData = product_data.filter(a => {
          var date = new Date(a.ProductHits);
          return (date >= startDate && date <= endDate);
        });
        console.log(resultProductData)
      */

      try{
        /* AGRUPA OS ITENS REPETIDOS DENTRO DO ARRAY */
        this.listaDeStorys = resp.filter((item, index, self) =>
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

      // console.log(this.usuarioStorys);

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

      // this.findAllPostagensSeguidores(this.idUsuarioLogado);

      this.listaDePostagens.map((item) => {

        if(item.id == idPostagem) {

          this.postagemService.getByIdPostagemUsuario(idPostagem).subscribe((resp: Postagem) => {
            item.mensagens = resp.mensagens;

            // console.log(item.likePostagem);

          });

        }

      });

      this.mensagem = new Mensagem();

    }, erro => {
      if(erro.status == 500) {
        alert('O correu um erro ao tentar realizar o comentarios!');

      }

    });

  }

  likePostagem(idUsuario: number, idPostagem: number) {
    this.postagemService.likePostagem(idUsuario, idPostagem).subscribe(() => {
      // this.findAllPostagensSeguidores(this.idUsuarioLogado);

      this.listaDePostagens.map((item) => {

        if(item.id == idPostagem) {

          this.postagemService.getByIdPostagemUsuario(idPostagem).subscribe((resp: Postagem) => {
            item.likePostagem = resp.likePostagem;

            // console.log(item.likePostagem);

          });

        }

      });

    });

  }

  logoutUsuario() {
    this.authService.logout();

  }

  seguirUsuario(idSeguindo: number, idSeguidor: number) {
    this.usuarioService.seguirUsuario(idSeguindo, idSeguidor).subscribe(() => {

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar seguir o usuario!!');
      }
    });

    setTimeout(() => {
      this.findAllStorysSeguidores(this.idUsuarioLogado);
      this.findAllPostagensSeguidores(this.idUsuarioLogado);
      this.findAllUsuariosParaSeguir(this.idUsuarioLogado);

    }, 1000);

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

}
