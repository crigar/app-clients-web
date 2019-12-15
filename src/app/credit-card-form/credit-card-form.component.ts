import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {
  @Output('add') add = new EventEmitter<any>();
  @Input('type') type: any = {};
  public data: FormGroup;
  public entities = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
  ) { }

  send(){
    this.add.emit({
      data: this.data.value
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
      entity: ['', []],
      pan: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      brand: ['', [Validators.required]],
    });
  }

}
