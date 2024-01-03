import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from 'src/app/model/Story';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UtilService } from 'src/app/service/util.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-story-util',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryUtilComponent implements OnInit {

  @Input() listaDeStorys: Story[];

  public username = environment.username;
  public img = environment.img;

  public usuarioStorys: Usuario = new Usuario();

  public key = 'data';
  public reverse = true;

  constructor(
    public utilService: UtilService,
    private usuarioService: UsuarioService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

  }

  findByIdUsuario(id: number) {
    window.document.querySelector('#gerenciar-modal')?.setAttribute('style', 'display: block;');

    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuarioStorys = resp;

    }, erro => {
      if(erro.status == 500 || erro.status == 400) {
        alert('OCORREU UM ERRO AO TENTAR ABRIR O STORYS!!');
      }

    });
  }

}
