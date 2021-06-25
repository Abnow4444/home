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

  constructor(private userDetails: UserDetailsService, private userService: UserDetailsService) { }


  ngOnInit(): void {
    this.updateDetails();
  }

  updateDetails(): void{
    this.userService.getUserDetails().subscribe(
      {
        next: res => {
          this.checkUserObj = this.userService.retrieveUserDBDetails().subscribe({
            next: data=>{
              this.checkUserObj = data;
              this.userObj = res;
              this.len = this.checkUserObj.filter((x: UserObj)  => x.ip == this.userObj.ip).length;
              console.log(this.len);
              if(this.len === 0){
                this.userService.updateDetails(this.userObj.ip);
                // this.userService.updateDetails(this.userObj.geoplugin_city, this.userObj.geoplugin_continentName, this.userObj.geoplugin_countryName, this.userObj.geoplugin_latitude, this.userObj.geoplugin_longitude, this.userObj.geoplugin_region, this.userObj.geoplugin_request)
              }
              const sub = this.userDetails.retrieveUserDBDetails().subscribe({
                next: data => {
                  this.visitorData = data;
                },
                error: err => console.log(err)
              })
            },
            error: err => console.log(err)
          });
        },
        error: err => console.log(err)
      })
  }

}
