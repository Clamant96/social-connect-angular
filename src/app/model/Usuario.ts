import { Story } from './Story';
import { Seguindo } from './Seguindo';
import { Postagem } from './Postagem';

export class Usuario {
  public id: number;
  public img: string;
  public nome: string;
  public username: string;
  public site: string;
  public senha: string;
  public biografia: string;
  public postagens: Postagem[];
  public like: Postagem[];
  public seguindo: Seguindo;
  public listaSeguindo: Seguindo[];
  public storys: Story;
  public email: string;

}
