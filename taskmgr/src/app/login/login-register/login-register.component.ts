import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  formModel: FormGroup;
  items: string[];
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    let img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    if (img === 'avatars:svg-0') {
      img = 'avatars:svg-1';
    }
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    this.formModel = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: []
    });
  }
  save({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
