import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input('showType') showType: any = {};

  public data: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
  ) { }

  send(){
    this.apiService.newUser(this.data.value)
      .subscribe((res: any) => {
        console.log(res);
        this.helperService.showToast('I am a standard toast');
        if(res.success == true){
          //this.helperService.toast('success', 'Ok!', res.message);
          //let to: string = this._authService.getRedirectUrl() || '/convocatories';
          //this._router.navigate([to]);
        }else if(res.error == undefined){
          //this.helperService.toast('warning', '¡Atención!', res.message);
        }else{
          //this.helperService.toast('error', 'Error', undefined);
        }
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
      userRoles: [[1], [Validators.required]],
    });
  }

  
}
