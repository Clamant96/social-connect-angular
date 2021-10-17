import { Seguindo } from './../model/Seguindo';
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

  usuario: Usuario = new Usuario();
  idUsuario: number;
  totalPostagens: number;
  totalSeguindo: number;
  totalSeguidores: number;

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

    /*if(environment.token == ''){
      this.router.navigate(['/login']);

    }*/

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.idUsuario = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.idUsuario);

  }

  findByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {

      if(resp.img == null) {
        resp.img = '../../assets/img/person_perfil_vazio.png';

      }

      this.usuario = resp;

      /* CALCULA A LISTA DE USUARIO SEGUIDOS PELO USUARIO LOGADO */
      this.totalSeguindo = this.usuario.listaSeguindo.length;

      /* CALCULA A LISTA DE USUARIO QUE SEGUEM O USUARIO LOGADO */
      this.listaDeSeguidores(id);

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
        //alert('Ocorreu um erro ao tentar carregar suas postagens!');

        //this.logout();

        //this.router.navigate(['/login']);

        this.postagemService.getAllByPostagensUsuarios().subscribe((resp: Postagem[]) => {

          let memoria = [];

          for(let i = 0; i < resp.length; i++) {
            if(resp[i].usuario.id == this.idUsuario) {
              memoria.push(resp[i]);
            }
          }

          this.listaDePostagens = memoria;

          console.log(this.listaDePostagens);

          this.totalPostagens = this.listaDePostagens.length;

        });

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

    this.postagem = new Postagem();

  }

  listaDeSeguidores(id: number) {
    this.usuarioService.getByIdSeguindo(id).subscribe((resp: Seguindo) => {
      this.totalSeguidores = resp.listaDeSeguindo.length;
    });

  }

}
