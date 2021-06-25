import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserObj } from '../visitor/UserObj';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserDetailsService) { }

  ngOnInit(): void {
  }

}

