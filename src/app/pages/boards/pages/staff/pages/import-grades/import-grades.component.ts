import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-grades',
  templateUrl: './import-grades.component.html',
  styleUrls: ['./import-grades.component.scss']
})
export class ImportGradesComponent implements OnInit {
  // in app.component.ts
  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
