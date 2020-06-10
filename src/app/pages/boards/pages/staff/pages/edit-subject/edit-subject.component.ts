import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

export interface Block {
  id?: number,
  title: string,
  content: any,
  type: string,
  files: File[],
  deleted: Boolean,
  first: Boolean,
  last: Boolean
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
      item.files = [];

      if(item.type === 'files') {
        item.content = JSON.parse(item.content);
      }

      return item;
    });
    this.pageTitle = subject.page.name;
    this.pageContent = subject.page.content;

    this.update();
  }


  onSelect(event, block) {
    block.files.push(...event.addedFiles);
  }

  onRemove(event, block) {
    // check if file is already upload, if so remove from content
    if(event.key in block.content) {
      delete block.content[event.key];
    } else {
      // it is a new file
      block.files.splice(block.files.indexOf(event), 1);
    }
  }

  up(block) {
    const currentIndex = this.blocks.indexOf(block);
    const newIndex = currentIndex - 1;
    const temp = this.blocks[newIndex];
    this.blocks[newIndex] = block;
    this.blocks[currentIndex] = temp;
    this.update();
  }

  down(block) {
    const currentIndex = this.blocks.indexOf(block);
    const newIndex = currentIndex + 1;
    const temp = this.blocks[newIndex];
    this.blocks[newIndex] = block;
    this.blocks[currentIndex] = temp;
    this.update();
  }

  update() {
    this.blocks = this.blocks.map(block => {
      block.first = false;
      block.last = false;
      return block;
    });

    // set first
    this.blocks[0].first = true;
    this.blocks[this.blocks.length - 1].last = true;
  }

  public addBlock() {
    this.blocks.push({
      title: '',
      content: '',
      type: this.blockTypeToAdd,
      files: [],
      deleted: false,
      first: false,
      last: false
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

        formData.append(`page_items[${index}][deleted]`, block.deleted === true ? '1' : '0');
        formData.append(`page_items[${index}][title]`, block.title);

        if(block.type === 'files') {
          formData.append(`page_items[${index}][content]`, JSON.stringify(block.content));
        } else {
          formData.append(`page_items[${index}][content]`, block.content);
        }

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
