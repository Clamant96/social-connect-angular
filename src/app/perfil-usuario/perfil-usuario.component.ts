import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from './../service/postagem.service';
import { UsuarioService } from './../service/usuario.service';
import { Postagem } from './../model/Postagem';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  idUsuario: number;
  totalPostagens: number;

  postagem: Postagem = new Postagem();
  usuarioPostagem: Usuario = new Usuario();
  listaDePostagens: Postagem[];

  usuarioMensagensPostagem: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    this.idUsuario = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.idUsuario);

  }

  findByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;

      this.findByPostagensUsuario();

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        this.router.navigate(['/login']);

      }

    });

  }

  findByPostagensUsuario() {
    this.postagemService.getAllByUsuarioPostagem(this.idUsuario).subscribe((resp: Postagem[]) => {
      this.listaDePostagens = resp;

      console.log(this.listaDePostagens);

      this.totalPostagens = this.listaDePostagens.length;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('Ocorreu um erro ao tentar carregar suas postagens!');

        this.router.navigate(['/login']);

      }

    });

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagemUsuario(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

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

}
