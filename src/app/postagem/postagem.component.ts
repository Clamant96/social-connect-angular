import { Usuario } from 'src/app/model/Usuario';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  public postagem: Postagem = new Postagem();

  public id = environment.id;
  public usuario: Usuario = new Usuario();

  public url: string = `${environment.service}${environment.port}`;

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    /*if(environment.token == '') {
      this.router.navigate(['/login']);

    }*/

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

  }

  postPostagem() {
    this.usuario.id = this.id;
    this.postagem.usuario = this.usuario;

    if(this.postagem.img != "" && this.postagem.descricao != "") {
      this.postagemService.postPostagemUsuario(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp;

        this.router.navigate(['/home']);

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('OCORREU UM ERRO AO TENTAR REALIZAR A POSTAGEM!!!');
        }

      });
    }
  }

}
