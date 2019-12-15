import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public data: FormGroup;
  public users = []
  public userEditing;
  public userNewCard;
  public response = {
    show: false,
    type: 'success',
    message: ''
  }
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data = this.fb.group({
      param: ['', [Validators.required]],
    });
  }

  edit( userId ){
    this.userEditing = userId;
    this.userNewCard = undefined;
  }

  newCard( userId ){
    this.userNewCard = userId;
    this.userEditing = undefined;
  }

  search(){
    this.apiService.getUserByParam(this.data.value.param)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
          this.users = res.data;
 
        }else if(res.error == undefined){
          this.response.show = true
          this.response.type = 'danger'
          this.response.message = res.message
          this.users = [];
        }else{
        }
        setTimeout(() => { 
          this.response.show = false;
         }, 2000);
      },(error) => {
        //this.helperService.toast('error', 'Error', undefined);
      });
  }

}
