import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HeaderComponent } from './header/header.component';
import { PerfilComponent } from './edicao/perfil/perfil.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PostagemComponent } from './postagem/postagem.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    CadastroComponent,
    HeaderComponent,
    PerfilComponent,
    PerfilUsuarioComponent,
    PostagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /* IMPORTA O FormsModule ==> PARA QUE SE POSSA UTILIZAR O ngModel DENTRO DO HTML */
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
