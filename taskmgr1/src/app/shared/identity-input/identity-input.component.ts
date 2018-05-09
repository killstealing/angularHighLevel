import { Identity, IdentityType } from './../../domain/user.model';
import { isValidDate } from './../../utils/date.utils';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, forwardRef, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { extractInfo } from '../../utils/identity.util';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private _idType = new Subject();
  private _idNo = new Subject();
  private sub: Subscription;
  identityTypes = [
    { value: IdentityType.IdCard, label: '身份证' },
    { value: IdentityType.Insurance, label: '医保' },
    { value: IdentityType.Passport, label: '护照' },
    { value: IdentityType.Military, label: '军官证' },
    { value: IdentityType.Other, label: '其他' },
  ];
  identity: Identity = { identityType: null, identityNo: null };
  private propagateChange = (_: any) => { };
  constructor() { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this._idNo, this._idType, (_id, _type) => {
      return {
        identityType: _type,
        identityNo: _id
      };
    });
    this.sub = val$.subscribe(id => {
      this.propagateChange(id);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  get idType(): Observable<{}> {
    return this._idType.asObservable();
  }

  get idNo(): Observable<{}> {
    return this._idNo.asObservable();
  }

  OnIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }



  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    switch (val.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdCard(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  validateIdCard(c: FormControl): { [key: string]: any } {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {
        idNotValid: true
      };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
  validatePassport(c: FormControl): { [key: string]: any } {
    const val = c.value.identityNo;
    if (val.length !== 9) {
      return {
        idNotValid: true
      };
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
  validateMilitary(c: FormControl): { [key: string]: any } {
    const val = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
  validateInsurance(c: FormControl): { [key: string]: any } {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {
        idNotValid: true
      };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }

}
