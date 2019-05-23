import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(public readonly router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event instanceof NavigationEnd)
        console.log(event);
    });
  }
}
