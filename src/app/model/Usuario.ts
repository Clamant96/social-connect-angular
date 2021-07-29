import { Postagem } from './Postagem';

export class Usuario {
  public id: number;
  public img: string;
  public nome: string;
  public username: string;
  public site: string;
  public senha: string;
  public biografia: string;
  public postagens: Postagem;
  public like: Postagem[];

}
