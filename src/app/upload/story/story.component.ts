import { StoryService } from '../../service/story.service';
import { Usuario } from 'src/app/model/Usuario';
import { Story } from '../../model/Story';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  public story: Story = new Story();

  public id = environment.id;
  public usuario: Usuario = new Usuario();

  constructor(
    private storyService: StoryService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

  }

  postStory() {
    this.usuario.id = this.id;
    this.story.usuario = this.usuario;

    if(this.story.img != "") {
      this.storyService.postStory(this.story).subscribe((resp: Story) => {
        this.story = resp;

        this.router.navigate(['/home']);

      }, erro => {
        if(erro.status == 500 || erro.status == 400) {
          alert('OCORREU UM ERRO AO TENTAR REALIZAR A POSTAGEM!!!');
        }

      });
    }
  }

}
