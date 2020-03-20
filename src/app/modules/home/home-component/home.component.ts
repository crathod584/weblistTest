import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HelperService } from '../../../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private helperService: HelperService, public router: Router) {}

  ngOnInit() {}

  logout() {

    if (this.helperService.getData('currentUser')) {
      this.helperService.clearData();
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['login']);
    }
  }

  function countActiveUser(data) {

  let userID = [];
  let activeUsersCount = {};

  for (let i = 0; i < 24; i++) {
    userID[i] = {};
    activeUsersCount[i] = 0;
  }

  data.map((item) => {

    let hour = new Date(item.timestamp * 1000).getHours();

    if (userID[hour][item.userId])
      return true;

    userID[hour][item.userId] = true;
    
    activeUsersCount[hour]++;

  });

  return activeUsersCount;
}


}
