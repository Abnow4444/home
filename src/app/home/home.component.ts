import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserObj } from '../visitor/UserObj';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userObj: any;
  xObj: any;
  checkUserObj: any = [];
  len: number = 0;
  constructor(private userService: UserDetailsService) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      {
        next: res => {
          this.checkUserObj = this.userService.retrieveUserDBDetails().subscribe({
            next: data=>{
              this.checkUserObj = data;
              this.userObj = res;
              this.len = this.checkUserObj.filter((x: UserObj)  => x.ip == this.userObj.geoplugin_request).length;
              if(this.len === 0){
                this.userService.updateDetails(this.userObj.geoplugin_city, this.userObj.geoplugin_continentName, this.userObj.geoplugin_countryName, this.userObj.geoplugin_latitude, this.userObj.geoplugin_longitude, this.userObj.geoplugin_region, this.userObj.geoplugin_request)
              }
            },
            error: err => console.log(err)
          });
        },
        error: err => console.log(err)
      }
    )
  }

}

