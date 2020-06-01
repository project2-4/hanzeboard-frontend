import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Observable, Subject} from "rxjs";
import {map, startWith, switchMap, tap} from "rxjs/operators";
import Fuse from "fuse.js";
import FuseResult = Fuse.FuseResult;

@Component({
  selector: 'app-drag-drop-search',
  templateUrl: './drag-drop-search.component.html',
  styleUrls: ['./drag-drop-search.component.scss']
})
export class DragDropSearchComponent implements OnInit {

  @Input('listOne')
  listOne = [];

  @Input('listTwo')
  listTwo = [];

  @Input('key')
  public key;

  @Input('value')
  public value;

  public searchOne$: Subject<string> = new Subject<string>();
  public searchTwo$: Subject<string> = new Subject<string>();

  public listOne$: Observable<Array<string>>;
  public listOneSearching: boolean = false;

  public listTwo$: Observable<Array<string>>;
  public listTwoSearching: boolean = false;

  @Output('listOne')
  public outputListOne = new EventEmitter();

  @Output('listTwo')
  public outputListTwo = new EventEmitter();

  ngOnInit() {
    this.listOne$ = this.searchOne$.pipe(
      startWith(''),
      map((searchText) => {
        if(searchText.length === 0) {
          this.listOneSearching = false;
          return this.listOne;
        }

        this.listOneSearching = true;
        const fuse = new Fuse(this.listOne, {
          keys: [this.value]
        });
        return fuse.search(searchText as string).map(result => result.item)
      })
    );

    this.listTwo$ = this.searchTwo$.pipe(
      startWith(''),
      map((searchText) => {
        if(searchText.length === 0) {
          this.listTwoSearching = false;
          return this.listTwo;
        }

        this.listTwoSearching = true;
        const fuse = new Fuse(this.listTwo,{
          keys: [this.value]
        });
        return fuse.search(searchText as string).map(result => result.item)
      })
    );
  }

  dropListOne(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }


    this.outputListOne.emit(event.container.data);
  }

  dropListTwo(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.outputListTwo.emit(event.container.data);
  }

}
