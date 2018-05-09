import { environment } from './../environments/environment';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Inject, ReflectiveInjector } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('square',
  //     [
  //       state('green', style({
  //         'background-color': 'green', 'height': '100px',
  //         'transform': 'translateY(-100%)'
  //       })),
  //       state('red', style({
  //         'background-color': 'red', 'height': '100px',
  //         'transform': 'translateY(100%)'
  //       })),
  //       transition('green => red', animate('.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')),
  //       transition('red => green', animate(5000, keyframes([
  //         style({transform: 'translateY(100%)'}),
  //         style({transform: 'translateY(98%)'}),
  //         style({transform: 'translateY(95%)'}),
  //         style({transform: 'translateY(90%)'}),
  //         style({transform: 'translateY(80%)'}),
  //         style({transform: 'translateY(60%)'}),
  //         style({transform: 'translateY(30%)'}),
  //         style({transform: 'translateY(0)'}),
  //         style({transform: 'translateY(-10%)'}),
  //         style({transform: 'translateY(-5%)'}),
  //         style({transform: 'translateY(-2%)'}),
  //         style({transform: 'translateY(0%)'}),
  //         style({transform: 'translateY(10%)'}),
  //         style({transform: 'translateY(15%)'}),
  //         style({transform: 'translateY(0)'}),
  //         style({transform: 'translateY(-15%)'}),
  //         style({transform: 'translateY(-40%)'}),
  //         style({transform: 'translateY(-80%)'}),
  //         style({transform: 'translateY(-90%)'}),
  //         style({transform: 'translateY(-80%)'}),
  //         style({transform: 'translateY(-90%)'}),
  //         style({transform: 'translateY(-95%)'}),
  //         style({transform: 'translateY(100%)'}),
  //       ]))),
  //     ]
  //   )
  // ]
})
export class AppComponent {
  title = 'app';
  darkTheme = false;
  squareState = '';
  constructor(private oc: OverlayContainer, @Inject('BASE_CONFIG') config) {
    console.log('config', config);
    const injector = ReflectiveInjector.resolveAndCreate([
      { provide: Person, useClass: Person },
      {
        provide: Address, useFactory: () => {
          if (environment.production) {
            return new Address('北京', '北京', '朝阳区', 'xx 街道');
          } else {
            return new Address('西藏', '拉萨', 'xx区', 'xx 街道');
          }
        }
      },
      {
        provide: Id, useFactory: () => {
          return Id.getInstance('idcard');
        }
      }
    ]);
    const childInjector = injector.resolveAndCreateChild([Person]);
    const person = injector.get(Person);
    const personFromChild = childInjector.get(Person);
    console.log(person === personFromChild);
  }
  onClick() {
    if (this.squareState === '' || this.squareState === 'red') {
      this.squareState = 'green';
    } else {
      this.squareState = 'red';
    }
  }

  switchTheme(dark) {
    this.darkTheme = dark;
  }
}

class Id {
  static getInstance(type: string): Id {
    return new Id();
  }
}

class Address {
  province: string;
  city: string;
  district: string;
  street: string;
  constructor(province, city, district, street) {
    this.province = province;
    this.city = city;
    this.district = district;
    this.street = street;
  }
}

class Person {
  id: Id;
  address: Address;
  constructor( @Inject(Id) id, @Inject(Address) address) {
    this.id = id;
    this.address = address;
  }
}
