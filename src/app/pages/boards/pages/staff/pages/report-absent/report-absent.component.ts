import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-absent',
  templateUrl: './report-absent.component.html',
  styleUrls: ['./report-absent.component.scss']
})
export class ReportAbsentComponent implements OnInit {

  public staff: Array<any> = [];
  public untillDate: any = '';
  public selectedStaff = '';
  public selectedReason = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  async ngOnInit() {
    this.staff = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff/all`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

  }

  public async submit() {
    try {
      const payload = {status: this.selectedReason, until: undefined
      };

      if (this.selectedReason !== 'available') {
        payload.until = `${this.untillDate}`;
      }

      await this.httpClient.put(`${environment.apiEndpoint}/staff/${this.selectedStaff}/status`, payload).toPromise();

      Swal.fire('Goed gedaan!', 'Absentie toegevoegd!', 'success');
      await this.router.navigate(['/staff']);

    } catch (e) {
      Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
    }
  }

}
