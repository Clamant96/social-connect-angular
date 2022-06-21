import { Usuario } from './../../model/Usuario';
import { Postagem } from './../../model/Postagem';
import { Router, ActivatedRoute } from '@angular/router';
import { PostagemService } from './../../service/postagem.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class EditarPostagemComponent implements OnInit {

  public postagem: Postagem = new Postagem();

  public id: number = 0;

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.id = this.route.snapshot.params['id'];
    this.findByIdPostagem(this.id);

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagemUsuario(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

    });

  }

  putPostagem() {
    console.log(this.postagem);

    let usuario: Usuario = new Usuario();
    usuario.id = this.postagem.usuario.id;

    this.postagem.usuario = usuario;

    this.postagemService.putPostagemUsuario(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;

      this.router.navigate(['/home']);

    });

  }

}
