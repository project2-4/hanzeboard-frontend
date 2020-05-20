import {AfterViewInit, Component, Directive, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;
  columns: string[];

  @Input()
  pageList: any;

  @Input()
  displayedColumns: any;

  @Input()
  dataTableData: any;

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.dataTableData);
    this.columns = Object.keys(this.dataSource.data[0]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public doFilter = (value) => {
    console.log('value: ' + value.value);
    this.dataSource.filter = value.value.trim().toLocaleLowerCase();
  }
}
