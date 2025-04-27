import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-chart',
  imports: [HighchartsChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!:Highcharts.Options;


  constructor(private userService:UserService){}

  ngOnInit(){
    this.userService.userlist.subscribe((data)=>{
      let dataArray=data.reduce((ac:any,cur:any)=>{
        let obj:any={name:cur.role,y:1};
        let index=ac.findIndex((el:any)=>el.name==cur.role);
        index!=-1?ac[index].y+=1:ac.push(obj);
        return ac;
      },[])
      this.setChartFunc(dataArray)
    })
  }

  setChartFunc(data:any){
    this.chartOptions = {
      title: {
        text: 'User Pie Chart'
      },
      series: [{
        data:data,
        type: 'pie'
      }],
      credits: {
        enabled: false
      },
    };
  }

}
