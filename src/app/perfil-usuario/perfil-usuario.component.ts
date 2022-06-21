import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from './../service/postagem.service';
import { UsuarioService } from './../service/usuario.service';
import { Postagem } from './../model/Postagem';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public idUsuario: number;
  public totalPostagens: number;
  public totalSeguindo: number;
  public totalSeguidores: number;

  public postagem: Postagem = new Postagem();
  public usuarioPostagem: Usuario = new Usuario();
  public listaDePostagens: Postagem[];

  public usuarioMensagensPostagem: Usuario[];

  public id: number = environment.id;

  constructor(
    private usuarioService: UsuarioService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.idUsuario = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.idUsuario);

  }

  findByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {

      this.usuario = resp;

      // CALCULA AS LISTAS DO USUARIO
      this.totalSeguindo = resp.listaSeguindo.length;
      this.totalSeguidores = resp.seguindo.listaDeSeguindo.length;
      this.totalPostagens = resp.postagens.length;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        this.router.navigate(['/login']);

      }

    });

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagemUsuario(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

      this.usuarioPostagem = resp.usuario;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar abrir a postagem!');

      }

    });

    this.postagem = new Postagem();

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

}
