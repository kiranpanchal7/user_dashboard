import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userData } from '../userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userlist=new BehaviorSubject(userData);

  constructor() { }

}
