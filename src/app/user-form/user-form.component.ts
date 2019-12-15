import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input('type') type: any = {};

  public data: FormGroup;
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

  send(){
    if ( this.type == 'user' ) {
      this.apiService.newUser(this.data.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
 
        }else if(res.error == undefined){
          
        }else{
          //this.helperService.toast('error', 'Error', undefined);
        }
        setTimeout(() => { 
          this.response.show = false;
         }, 2000);
      },(error) => {
        //this.helperService.toast('error', 'Error', undefined);
      });
    }
  }

  public addClient( event ){
    this.data.controls.creditCardsInfo.setValue( [ event.data ] );
    console.log(this.data.value);
    
    this.apiService.newClient(this.data.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
        }else if(res.error == undefined){
          //this.helperService.toast('warning', '¡Atención!', res.message);
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

  ngOnInit() {
    this.data = this.fb.group({
      username: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      passAgain: ['', [Validators.required]],
      document: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      userRoles: [[ ( ( this.type == 'user' )?1:2 ) ], [Validators.required]],
      creditCardsInfo: ['', [Validators.required]],
    });
    if (this.type == 'user') this.data.removeControl('creditCardsInfo');
    console.log(this.type);
    
  }

  
}
