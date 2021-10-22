import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { metaData } from 'src/app/shared/components/advanced-table/advanced-table.component';
import { decryption } from 'src/app/shared/genericFunctions/encryptionFun';
import { clickableColumns } from 'src/app/shared/models/clickableColumns';

@Component({
  selector: 'app-clinical-trial',
  templateUrl: './clinical-trial.component.html',
  styleUrls: ['./clinical-trial.component.scss']
})
export class ClinicalTrialComponent implements OnInit {

  userDetailsList: any[] = [];
  targetList: any[] = [];
  downloadFileName = "UserList";
  MasterConditions: any[] = [];
  sendDisplayedColumns: string[] = ['fullName', 'emailAddress', 'roleName', 'telephone', 'statusText'];
  showColumnNames: string[] = ['Name', 'Email', 'Role', 'Phone', 'Status'];
  clickableColumns: clickableColumns[] = [
    { column: 'action', icon: 'edit', function: 'done' },
  ];
  metaData: metaData = {
    pageIndex: 1,
    pageSize: 10,
    totalRecords: 0
  }
  displayedColumns = [
    { displayName: 'Name', key: 'fullName', isSort: true, class: '', width: '20%' },
    { displayName: 'Email', key: 'emailAddress', isSort: true, class: '', width: '30%' },
    { displayName: 'Role', key: 'roleName', isSort: true, class: '', width: '15%' },
    { displayName: 'Phone', key: 'telephone', isSort: true, class: '', width: '20%' },
    { displayName: 'Status', key: 'statusText', isSort: true, class: '', width: '15%' },
    { displayName: 'Actions', key: 'Actions', width: '20%' }
  ];
  actionButtons = [
    { displayName: 'Edit', key: 'edit', type: 'icon', class: 'fa fa-pencil edit-purple' },
    { displayName: 'Delete', key: 'delete', type: 'icon', class: 'fa fa-times cross-delete' }
  ];

  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  data: any[];

  constructor() { }

  ngOnInit() {
    this.getUserList();
  }

  done() {
    console.log('working');
  }

  onTableActionClick(actionObj: any) {
    const id = actionObj.data && actionObj.data.id;
    const name = actionObj.data && actionObj.data.name;
    switch ((actionObj.action || '').toUpperCase()) {
      case 'EDIT':
        console.log("Edit");
        break;
      case 'DELETE':
        console.log("DELETE");
        break;
      case 'CHANGE_STATUS':
        console.log("CHANGE_STATUS");
        break;
      default:
        break;
    }
  }

  manageListToDisplay(list: any[]): any[] {
    debugger
    if (list == null || list == undefined || list.length == 0) return [];
    let _lst = list.map(s => Object.assign(s));
    _lst.forEach(s => {
      s.statusText = s.isActive ? "Active" : "Inactive";

      if (s.firstName && s.firstName != '') {
        s.firstName = decryption(s.firstName);
      } else s.firstName = '';
      if (s.lastName && s.lastName != '') {
        s.lastName = decryption(s.lastName);
      } else s.lastName = '';

      if (s.lastName != '') s.fullName = s.firstName + ' ' + s.lastName;
      else s.fullName = '';

      if (s.telephone && s.telephone != '') {
        s.telephone = decryption(s.telephone);
      }

      if (s.emailAddress && s.emailAddress != '' && !s.emailAddress.toString().includes('@')) {
        s.emailAddress = decryption(s.emailAddress);
      } else {
        s.emailAddress = '';
      }

    });

    console.log(_lst)
    return _lst;
  }

  onChange(metaData: any) {
    this.metaData.pageIndex = metaData.pageIndex;
    this.metaData.pageSize = metaData.pageSize;
    this.metaData.searchText = metaData.searchText;
    this.getUserList();
  }


  getUserList() {

    this.data = [
      {
        'fullName': 'Nitesh',
        'emailAddress': "nitesh5@yopmail.com",
        'roleName': 'Medical Director',
        'telephone': '8877995652',
        'statusText': 'Active'
      },
      {
        'fullName': 'Rajesh',
        'emailAddress': "nitesh5@yopmail.com",
        'roleName': 'Medical Director',
        'telephone': '8877995652',
        'statusText': 'Active'
      },
    ]

    this.targetList = this.data;
  }


}
