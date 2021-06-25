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
  constructor(private userDetails: UserDetailsService) { }

  ngOnInit(): void {
    const sub = this.userDetails.retrieveUserDBDetails().subscribe({
      next: data => {
        this.visitorData = data;
      },
      error: err => console.log(err)
    })
  }

}
