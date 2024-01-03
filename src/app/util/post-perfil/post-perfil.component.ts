import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Usuario } from 'src/app/model/Usuario';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-post-perfil',
  templateUrl: './post-perfil.component.html',
  styleUrls: ['./post-perfil.component.css']
})
export class PostPerfilComponent implements OnInit {

  @Input() usuario: Usuario;
  @Input() postagem: Postagem;
  @Input() usuarioPostagem: Usuario;

  constructor(
    public utilService: UtilService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

  }

}
