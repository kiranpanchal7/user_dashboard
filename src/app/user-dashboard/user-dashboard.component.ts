import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserService } from '../Service/user.service';
import { ChartComponent } from '../chart/chart.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [ChartComponent,FormsModule,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {

  @ViewChild ('modalContainer', { read: ViewContainerRef }) modalContainer!:ViewContainerRef;

  userlistArray:any=[];
  showAddUserModal:boolean=false;
  searchValue:any='';


  constructor(public userService:UserService){

  }

  ngOnInit(){
    this.userService.userlist.subscribe((list)=>{      
      this.userlistArray=list;
    });
  }

  async addUserFunc(){
    this.showAddUserModal=true;
    const { AddUserComponent } = await import('../add-user/add-user.component');
    let componentRef=this.modalContainer.createComponent(AddUserComponent);
    componentRef.instance.notifyClose.subscribe(() => {
      this.modalContainer.clear();
    });
  }


  searchUserFunc(){
    if(this.searchValue.length!=0){
      this.userlistArray=this.userlistArray.filter((el:any)=>(el.name).toLowerCase().includes(this.searchValue.toLowerCase()));
    }
    else{
      this.userService.userlist.subscribe((data)=>{
        this.userlistArray=data
      })
    }
  }

}
