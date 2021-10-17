import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;

      environment.id = this.userLogin.id;
      environment.nome = this.userLogin.nome;
      environment.username = this.userLogin.username;
      environment.img = this.userLogin.img;
      environment.token = this.userLogin.token;
      environment.biografia = this.userLogin.biografia;
      environment.site = this.userLogin.site;

      console.log(environment.id);
      console.log(environment.nome);
      console.log(environment.username);
      console.log(environment.img);
      console.log(environment.token);
      console.log(environment.biografia);
      console.log(environment.site);

      /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
      localStorage.setItem('token', environment.token);

      this.router.navigate(['/home']);

    }, erro => {
      if(erro.status == 500) {
        alert('Usuario ou senha estao incorretos!');

      }

    });

  }

}
