import { UtilService } from './../../service/util.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mensagem } from 'src/app/model/Mensagem';
import { Postagem } from 'src/app/model/Postagem';
import { Usuario } from 'src/app/model/Usuario';
import { MensagemService } from 'src/app/service/mensagem.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() postagem: Postagem;

  public url: string = `${environment.service}${environment.port}`;

  public idUsuarioLogado = environment.id;

  public usuarioPostagem: Usuario = new Usuario();
  public minhasPostagens: Postagem = new Postagem();
  public mensagem: Mensagem = new Mensagem();

  public listaDePostagens: Postagem[];

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private usuarioService: UsuarioService,
    private mensagemService: MensagemService,
    public utilService: UtilService,

    ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

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

  likePostagem(idUsuario: number, idPostagem: number) {

    this.postagemService.likePostagem(idUsuario, idPostagem).subscribe(() => {

      this.postagemService.getByIdPostagemUsuario(idPostagem).subscribe((resp: Postagem) => {
        this.postagem.likePostagem = resp.likePostagem;

      });

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

      this.postagemService.getByIdPostagemUsuario(idPostagem).subscribe((resp: Postagem) => {
        this.postagem.mensagens = resp.mensagens;

      });

      this.mensagem = new Mensagem();

    }, erro => {
      if(erro.status == 500) {
        alert('O correu um erro ao tentar realizar o comentarios!');

      }

    });

  }

}