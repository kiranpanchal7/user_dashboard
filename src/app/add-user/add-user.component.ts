import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  @Output() notifyClose=new EventEmitter();
  
  userForm:any=[];

  constructor(private fb:FormBuilder,private userService:UserService){
    this.userForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      role:['',Validators.required]
    })
  }

  async submitUserFunc(){
    console.log("user=>",this.userForm)
    if(!this.userForm['valid']){
      alert("Something Went Wrong !!");
      return;
    }
    await this.commonValidation('name',"User Already Exist");
    await this.commonValidation('email',"Email Address Already Exist");
    this.userService.userlist.next([...this.userService.userlist.value,this.userForm.value]);
    this.closeAddUserModal();
  }

  commonValidation(type:any,message:any){
    return new Promise((resolve,reject)=>{
      try{
        if(this.userService.userlist.value.some((el:any)=>el[type].toLocaleLowerCase()==this.userForm.value[type].toLocaleLowerCase())){
          alert(message);
          return;
        }
        resolve(true)
      }
      catch(err){
        reject(err)
      }
    })
  }


  closeAddUserModal(){
    this.notifyClose.emit(false)
    this.userForm.reset({name:'',email:'',role:''});
  }

}
