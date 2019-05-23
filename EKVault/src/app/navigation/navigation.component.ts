import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {BackupReminderService} from "../popups/backup-up-reminder-popup/backup-reminder.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(public readonly router: Router,
              private readonly backupReminderService: BackupReminderService) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event instanceof NavigationEnd)
        this.backupReminderService.tryBackUpOrReminder();
    });
  }
}
