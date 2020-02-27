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

  countActiveUser(data) {
    let activeUser: any = [];
    
    // o(n)
    activeUser = data.filter((user, index, array) => {
      return array.indexOf(user.userId) === index; 
    });
    
    // O(n)   time comlexity of sort function is depend on browser and length of array   
    activeUser.sort(function(a, b){
     return a.timestamp-b.timestamp
    })
    
    // Time Complexity O(n+n) = O(2n)
    return activeUser;
  }

}
