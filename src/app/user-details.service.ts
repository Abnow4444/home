import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService implements OnInit{

  // url: any = 'http://www.geoplugin.net/json.gp';
  url: any = 'https://jsonip.com/';
  visitorUrl: any = 'https://sheet.best/api/sheets/3ad2679a-2d4d-41c6-90a2-4567f32db142';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    return this.http.get(this.url);
  }

  // updateDetails(city: any, continent: any, country: any, latitude: any, longitude: any, state: any, ip: any){
  //   this.http.post(this.visitorUrl, {city: city, continent: continent, country: country, latitude: latitude, longitude: longitude, state: state, ip: ip}, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe();
  // }
  insertDetails(ip: any, latestDate: any, id: any){
    this.http.post(this.visitorUrl, {ip: ip, dateVisited: latestDate, ID: id}, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe();
  }

  retrieveUserDBDetails(){
    return this.http.get(this.visitorUrl);
  }

  updateContent(ip:any, latestDate: any, id: number){
    if(!isNaN(id) && id >= 0){
      this.http.put(this.visitorUrl + "/" + id, {ip: ip, dateVisited: latestDate, ID: id+1}, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe();
    }
  }
}


