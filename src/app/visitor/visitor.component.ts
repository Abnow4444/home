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
    this.getVisitorData();
  }

  updateDBDetails(): void{
    this.userService.getUserDetails().subscribe(
      {
        next: res => {
          this.checkUserObj = this.userService.retrieveUserDBDetails().subscribe({
            next: data=>{
              this.checkUserObj = data;
              this.userObj = res;
              this.len = this.checkUserObj.filter((x: UserObj)  => x.ip == this.userObj.ip).length;
              this.checkUserObj.filter((x: UserObj)  => x.ip == this.userObj.ip)[0].dateVisited = new Date();
              // console.log(this.checkUserObj.filter((x: UserObj)  => x.ip == this.userObj.ip)[0].dateVisited);
              // this.userDetails.updateContent(new Date());
              if(this.len === 0){
                this.userService.insertDetails(this.userObj.ip, new Date());
                // this.userService.updateDetails(this.userObj.geoplugin_city, this.userObj.geoplugin_continentName, this.userObj.geoplugin_countryName, this.userObj.geoplugin_latitude, this.userObj.geoplugin_longitude, this.userObj.geoplugin_region, this.userObj.geoplugin_request)
              }
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

  putDBDetails(): void{

  }

}
