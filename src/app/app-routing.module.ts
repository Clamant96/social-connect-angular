import { StoryComponent } from './story/story.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './edicao/perfil/perfil.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PostagemComponent } from './postagem/postagem.component';
import { EditarPostagemComponent } from './edicao/postagem/postagem.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'home', component: IndexComponent },
  { path: 'pagina-inicial', component: IndexComponent },
  { path: 'perfil/:id', component: PerfilUsuarioComponent },
  { path: 'meu-perfil/:id', component: PerfilUsuarioComponent },
  { path: 'editar-perfil/:id', component: PerfilComponent },
  { path: 'editar-postagem/:id', component: EditarPostagemComponent },
  { path: 'postagem', component: PostagemComponent },
  { path: 'story', component: StoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
