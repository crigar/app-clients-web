import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public login: FormGroup;
  public loginActive = true;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      username: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  public sigin(){
    console.log(this.login.value);
  }

}
