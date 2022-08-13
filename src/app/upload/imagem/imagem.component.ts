import { PostagemService } from './../../service/postagem.service';
import { Component, OnInit } from '@angular/core';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css']
})
export class ImagemComponent implements OnInit {

  selectedFile: ImageSnippet;

  url: any;
  msg: string = "";

  constructor(
    private imageService: PostagemService

  ){}

  ngOnInit() {
    window.scroll(0,0);

  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    this.viewFileImg(imageInput.files);

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
          console.log(res);
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  viewFileImg(file: any) { //Angular 11, for stricter type
		if(!file[0] || file[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = file[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(file[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
	}

}
