import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserObj } from './UserObj';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  visitorData : any;
  userObj: any;
  xObj: any;
  checkUserObj: any;
  len: number = 0;
  b: boolean = false;

  constructor(private userDetails: UserDetailsService, private userService: UserDetailsService) { }


  ngOnInit(): void {
    this.updateDBDetails();
  }

  updateDBDetails(): void{
    this.userService.getUserDetails().subscribe(
      {
        next: res => {
          this.checkUserObj = this.userService.retrieveUserDBDetails().subscribe({
            next: data=>{
              this.checkUserObj = data;
              this.userObj = res;
              this.xObj = this.checkUserObj.filter((x: UserObj) => x.ip == this.userObj.ip);
              this.len = this.xObj.length;
              if(this.len !== 0){
                this.putDBDetails(this.xObj[0].ip , (new Date()).toLocaleString(), Number(this.xObj[0]?.ID));
              }
              if(this.len === 0){
                this.userService.insertDetails(this.userObj.ip, (new Date()).toLocaleString(), this.checkUserObj.length+1);
              }
              this.getVisitorData();
            },
            error: err => {
              console.log(err);
              this.b = true;
            }
          });
        },
        error: err => {
          console.log(err);
          this.b = true;
        }
      })
  }


  getVisitorData(): void{
    const sub = this.userDetails.retrieveUserDBDetails().subscribe({
      next: data => {
        this.b = true;
        this.visitorData = data;
      },
      error: err => {
        console.log(err);
        this.b = true;
      }
    })
  }

  putDBDetails(ip:any, latestDate: any, id: number): void{
    this.userService.updateContent(ip, latestDate, id-1);
  }

}
