import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";

export interface Block {
  title: string,
  content: string,
  type: string,
  files: File[]
}

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss']
})
export class EditSubjectComponent implements OnInit {

  public name: string = '';
  public blockTypeToAdd = 'text';
  public blocks: Array<Block> = [];
  public assigments = [];
  public courseId;
  public subjectId;
  public pageTitle;
  public pageContent

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    const subject = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

    this.assigments = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}/assignments`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

    this.name = subject.name;
    this.blocks = subject.page.items;
    this.pageTitle = subject.page.name;
    this.pageContent = subject.page.content;
  }


  onSelect(event, block) {
    console.log(event);
    block.files.push(...event.addedFiles);6
  }

  onRemove(event, block) {
    console.log(event);
    block.files.splice(block.files.indexOf(event), 1);
  }


  public addBlock() {
    this.blocks.push({
      title: '',
      content: '',
      type: this.blockTypeToAdd,
      files: []
    } as Block);


  }

  public deleteBlock(block) {
    const index = this.blocks.indexOf(block);
    this.blocks.splice(index, 1);
  }


  public async submit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const subjectId = this.route.snapshot.paramMap.get('subjectId');

    try {
      await this.httpClient.put<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}`, {
        name: this.name,
        page_name: this.pageTitle,
        page_content: this.pageContent,
        page_items: this.blocks
      }).toPromise();

      await this.router.navigate(['/staff/manage-subjects/' + courseId]);
    } catch (e) {
      if(e.error.message) {
        alert(e.error.message);
      }
    }
  }

}
