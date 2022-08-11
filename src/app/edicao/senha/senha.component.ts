import { Router } from '@angular/router';
import { Usuario } from './../../model/Usuario';
import { UsuarioService } from './../../service/usuario.service';
import { UserLogin } from './../../model/UserLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();
  user: Usuario = new Usuario();
  email: string = "";
  envioEmail: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

  }

  pesquisar() {
    this.usuarioService.getByUsernameUsuario(this.userLogin.username).subscribe((resp: Usuario[]) => {

      if(resp.length == 0) {
        this.email = 'erro';

      }

      resp.map((item) => {

        this.email = item.email;
        item.senha = `http://localhost:4200/atualizar-senha/${item.id}`

        this.usuarioService.enviarEmail(item).subscribe((resp: boolean) => {
          this.envioEmail = resp;

          if(resp) {

            setTimeout(() => {
              this.router.navigate(['/login']);

            }, 1000);

          }

        });

      });

    });

  }

}
