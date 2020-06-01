import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  public course: number;
  public announcements = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.course = parseInt(this.route.parent.snapshot.paramMap.get('course'), 10);

    this.announcements = await this.loadAnnouncements();
  }

  async loadAnnouncements() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.course}/announcements/`).toPromise();

    request.message.forEach((element) => {
      element.active = false;
    });

    return request.message;
  }

}
