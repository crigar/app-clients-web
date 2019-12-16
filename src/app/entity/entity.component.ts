import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from '../app-validators';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  public data: FormGroup;
  public entities = [];
  public response = {
    show: true,
    type: 'success',
    message: '',
  }
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
  ) { }

  send(){
    this.apiService.newEntity(this.data.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
          this.getEntities();
        }else if(res.error == undefined){
          this.response.show = true
          this.response.type = 'danger'
          this.response.message = res.message
        }else{
          this.response.show = true
          this.response.type = 'danger'
          this.response.message = res.message
        }
        setTimeout(() => { 
          this.response.show = false;
         }, 2000);
      },(error) => {
        //this.helperService.toast('error', 'Error', undefined);
      });
  }

  getEntities(){
    this.apiService.getEntities()
      .subscribe((res: any) => {
        this.entities = res;
        console.log(res);
      });
  }

  ngOnInit() {
    this.getEntities();
    this.data = this.fb.group({
      nit: ['', [Validators.required, AppValidators.nit]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

}
