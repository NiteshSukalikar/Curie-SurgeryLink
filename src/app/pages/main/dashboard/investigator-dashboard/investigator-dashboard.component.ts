import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/shared/interfaces/TableColumn';
import { ChathubService } from 'src/app/utilities/_services/chathub.service';
import { LogService } from 'src/app/utilities/_services/log.service';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
import { Order } from '../patient-dashboard/Order';

@Component({
  selector: 'app-investigator-dashboard',
  templateUrl: './investigator-dashboard.component.html',
  styleUrls: ['./investigator-dashboard.component.css'],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class InvestigatorDashboardComponent implements OnInit {
  orders: Order[];
  ordersTableColumns: TableColumn[];
  displayedColumns: string[] = ['title', 'primaryColor', 'startsAt', 'endsAt', 'action'];
  appointmentList: { id: number; title: string; primaryColor: string; startsAt: Date; endsAt: Date; description: string; }[];
  dataSource: { id: number; title: string; primaryColor: string; startsAt: Date; endsAt: Date; description: string; }[];

  constructor(
    private currencyPipe: CurrencyPipe,
    private notifierService: NotificationService,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe,
    private logService: LogService,
    private signalrService: ChathubService,
    private router: Router
  ) {}

  ngOnInit(): void {
  // this.initializeColumns();
    //this.orders = this.getOrders(); 
    this.getList();
  }

  getList() {
    this.appointmentList = [
      { id: 1, title: 'A 3 day for patient', primaryColor: 'red', startsAt: new Date(), endsAt: new Date(), description: 'Description - A 3 day for patient' },
      { id: 2, title: 'A meeting event with no end', primaryColor: 'yellow', startsAt: new Date(), endsAt: new Date(), description: 'Description - A meeting event with no end' },
      { id: 3, title: 'A long event that spans 2 months', primaryColor: 'blue', startsAt: new Date(), endsAt: new Date(), description: 'Description - A long event that spans 2 months' },
      { id: 4, title: 'A 3 day for patient', primaryColor: 'orange', startsAt: new Date(), endsAt: new Date(), description: 'Description - A 3 day for patient' },
      { id: 5, title: 'A draggable and resizable event', primaryColor: 'skyblue', startsAt: new Date(), endsAt: new Date(), description: 'Description - A draggable and resizable event' },
    ];

    this.dataSource = this.appointmentList;
  }
  

  
  sortData(sortParameters: Sort) : any {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.orders = this.orders.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.orders = this.orders.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.orders = this.getOrders();
    }
  }
  removeOrder(order: Order) {
    this.orders = this.orders.filter(item => item.id !== order.id)
  }

  initializeColumns(): void {
    this.ordersTableColumns = [
      {
        name: 'book name',
        dataKey: 'description',
        position: 'left',
        isSortable: true
      },
      {
        name: 'ordered amount',
        dataKey: 'amount',
        position: 'right',
        isSortable: false
      },
      {
        name: 'book price',
        dataKey: 'price',
        position: 'right',
        isSortable: true
      },
      {
        name: 'book discount',
        dataKey: 'discount',
        position: 'right',
        isSortable: false
      },
    ];
  }

  getOrders(): any[] {
    return [
      {
        id: 1,
        description: 'first book',
        amount: this.decimalPipe.transform(2, '.1'),
        price: this.currencyPipe.transform(15),
        discount: this.percentPipe.transform(0, '.2')
      },
      {
        id: 2,
        description: 'second book',
        amount: this.decimalPipe.transform(1, '.1'),
        price: this.currencyPipe.transform(42.5),
        discount: this.percentPipe.transform(0.1, '.2')
      },
      {
        id: 3,
        description: 'third book',
        amount: this.decimalPipe.transform(4, '.1'),
        price: this.currencyPipe.transform(12.99),
        discount: this.percentPipe.transform(0.05, '.2')
      },
      {
        id: 4,
        description: 'fourth book',
        amount: this.decimalPipe.transform(1, '.1'),
        price: this.currencyPipe.transform(19.99),
        discount: this.percentPipe.transform(0.02, '.2')
      },
      {
        id: 5,
        description: 'fifth book',
        amount: this.decimalPipe.transform(8),
        price: this.currencyPipe.transform(10.25),
        discount: this.percentPipe.transform(0.2, '.2')
      }
    ];
  }
}
