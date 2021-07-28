import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string;

  constructor(
    /* INGETA AS DEPENDENCIAS PARA O COMPONENTE */
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  cadastrar() {
    if(this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estao incorretas!');

    }else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;

        this.router.navigate(['/login']);

        alert('Usuario cadastrado com sucesso!');

      });

    }

  }

}
