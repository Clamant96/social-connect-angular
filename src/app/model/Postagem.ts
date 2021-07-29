import { Mensagem } from './Mensagem';
import { Usuario } from './Usuario';

export class Postagem {
  public id: number;
  public img: string;
  public descricao: string;
  public likes: number;
  public usuario: Usuario;
  public mensagens: Mensagem[];
  public likePostagem: Usuario[];

}
