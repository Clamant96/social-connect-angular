import { AuthService } from './../../service/auth.service';
import { Postagem } from './../../model/Postagem';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  idUsuario: number;
  confirmarSenha: string;

  public url: string = `${environment.service}${environment.port}`;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router

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

  carregaImagem(username: string, img: string) {

    if(username == null || username == '' || img == null || img == '') {
      return '';
    }

    if(img.includes("person_perfil_vazio")) {

      return img;
    }

    return `${this.url}/image/carregar/${username}/${img}`;
  }

  findByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {

      if(resp.img == null) {
        resp.img = '../../assets/img/person_perfil_vazio.png';

      }

      this.usuario = resp;

    });

  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  atualizar() {
    if(this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estao incorretas!');

    }else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {

        this.usuario = resp;

        this.authService.logout();

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('Ocorreu um erro ao tentar atualizar o perfil!');

        }

      });

    }

  }

}
