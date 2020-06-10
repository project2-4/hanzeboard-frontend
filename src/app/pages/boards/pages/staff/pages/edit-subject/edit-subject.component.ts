import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";

export interface Block {
  id?: number,
  title: string,
  content: string,
  type: string,
  files: File[],
  deleted: Boolean
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
    this.blocks = subject.page.items.map(item => {
      item.deleted = false;
      return item;
    });
    this.pageTitle = subject.page.name;
    this.pageContent = subject.page.content;
  }


  onSelect(event, block) {
    block.files.push(...event.addedFiles);
    console.log(block.files);
  }

  onRemove(event, block) {
    console.log(event, block);
    //block.files.splice(block.files.indexOf(event), 1);
  }


  public addBlock() {
    this.blocks.push({
      title: '',
      content: '',
      type: this.blockTypeToAdd,
      files: [],
      deleted: false
    } as Block);
  }

  public deleteBlock(block) {
    block.deleted = true;
  }


  public async submit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const subjectId = this.route.snapshot.paramMap.get('subjectId');

    try {

      const formData = new FormData();
      formData.append('name', this.name)
      formData.append('page_name', this.pageTitle);
      formData.append('page_content', this.pageContent);
      formData.append('_method', 'PUT');

      let index = 0;
      this.blocks.forEach(block => {

        if(block.id) {
          formData.append(`page_items[${index}][id]`, block.id as any);
        }

        formData.append(`page_items[${index}][deleted]`, block.deleted ? '1' : '0');
        formData.append(`page_items[${index}][title]`, block.title);
        formData.append(`page_items[${index}][content]`, block.content);
        formData.append(`page_items[${index}][type]`, block.type);

        block.files.forEach(file => {
          formData.append(`page_items[${index}][files][]`, file);
        })

        index++;
      });

      console.log(formData);

      await this.httpClient.post<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}`, formData).toPromise();

      await this.router.navigate(['/staff/manage-subjects/' + courseId]);
    } catch (e) {
      console.log(e);
      if(e.error.message) {
        alert(e.error.message);
      }
    }
  }

}
