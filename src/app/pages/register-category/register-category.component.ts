import { Component, OnInit } from '@angular/core';
import { CategoryService }  from '../../service/category.service';

@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.scss']
})
export class RegisterCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getBase64(event:any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

}
