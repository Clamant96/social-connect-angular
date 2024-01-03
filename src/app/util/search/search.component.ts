import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public nomePesquisado: string;
  public dropDownPesquisa: boolean = false;

  public listaUsuario: Usuario[];

  constructor(
    private authService: AuthService,
    public utilService: UtilService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

  }

  minhaPesquisa(event: any) {
    this.nomePesquisado = event.target.value;

    this.pesquisa(this.nomePesquisado);

  }

  pesquisa(pesquisa: string) {

    this.gerenciaDropDownPesquisa(true);

    this.authService.pesquisaUsuario(pesquisa).subscribe((resp: Usuario[]) => {
      this.listaUsuario = resp;

    }, erro => {
      this.gerenciaDropDownPesquisa(false);

    });

    this.nomePesquisado = '';

  }

  gerenciaDropDownPesquisa(status: boolean) {
    this.dropDownPesquisa = status;

  }

  ajustarDropDown() {
    setTimeout(() => {
    // OCULTA DROPDOWN PESQUISA
      window.document.querySelector('.dropdown-content')?.setAttribute('style', 'display: none !important;');

    }, 1000);

  }

}
