import { AuthService } from './../../service/auth.service';
import { Usuario } from 'src/app/model/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atualizar-senha',
  templateUrl: './atualizar-senha.component.html',
  styleUrls: ['./atualizar-senha.component.css']
})
export class AtualizarSenhaComponent implements OnInit {

  usuario: Usuario = new Usuario();
  email: string = "";
  idUsuario: number = 0;
  envioEmail: boolean = false;

  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    this.idUsuario = this.route.snapshot.params['id'];

    this.getByIdUsuario(this.idUsuario);

  }

  getByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;

      this.usuario.senha = "";

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
