import { AuthService } from './../../service/auth.service';
import { Postagem } from './../../model/Postagem';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  idUsuario: number;
  confirmarSenha: string;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    this.idUsuario = this.route.snapshot.params['id'];

    this.findByIdUsuario(this.idUsuario);

  }

  findByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
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

        this.router.navigate(['/login']);

        alert('Usuario atualizado com sucesso!');

      });

    }

  }

}
