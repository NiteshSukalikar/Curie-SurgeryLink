import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableColumn } from 'src/app/shared/interfaces/TableColumn';
import { Order } from './Order';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class PatientDashboardComponent implements OnInit {

  orders: Order[];
  ordersTableColumns: TableColumn[];

  constructor(private currencyPipe: CurrencyPipe,
              private decimalPipe: DecimalPipe,
              private percentPipe: PercentPipe) {
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.orders = this.getOrders();
  }

  sortData(sortParameters: Sort):any {
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
