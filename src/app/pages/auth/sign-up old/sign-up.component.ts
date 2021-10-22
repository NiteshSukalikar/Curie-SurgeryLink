import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/shared/interfaces/TableColumn';
import { ChathubService } from 'src/app/utilities/_services/chathub.service';
import { LogService } from 'src/app/utilities/_services/log.service';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
// import { Order } from '../../main/dashboard/patient-dashboard/Order';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe],
})
export class SignUpComponent implements OnInit {
  orders: Order[];
  ordersTableColumns: TableColumn[];

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
    //this.logService.log("Test the `log()` Method");
    this.initializeColumns();
    this.orders = this.getOrders();
    this.signalrService.startConnection();
    if (localStorage.getItem('adminId')) {
      return;
    } else if (localStorage.getItem('user1Id')) {
      debugger;
      this.signalrService.hubConnection.on(
        'askServerResponse',
        (someText: any) => {
          this.notifierService.success('inside signup page');
        }
      );
    }
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.orders = this.orders.sort((a: any, b: any) =>
        a[keyName].localeCompare(b[keyName])
      );
    } else if (sortParameters.direction === 'desc') {
      this.orders = this.orders.sort((a: any, b: any) =>
        b[keyName].localeCompare(a[keyName])
      );
    } else {
      return (this.orders = this.getOrders());
    }
    return;
  }

  removeOrder(order: Order) {
    this.orders = this.orders.filter((item) => item.id !== order.id);
  }
  new() {
    this.notifierService.success('login Sucessful');
  }

  initializeColumns(): void {
    this.ordersTableColumns = [
      {
        name: 'First name',
        dataKey: 'firstName',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'last Name',
        dataKey: 'lastName',
        position: 'right',
        isSortable: false,
      },
      {
        name: 'Address Temp',
        dataKey: 'Address',
        position: 'right',
        isSortable: true,
      },
      {
        name: 'Mobile',
        dataKey: 'Mobile',
        position: 'right',
        isSortable: false,
      },
    ];
  }

  getOrders(): any[] {
    return [
      {
        id: 1,
        firstName: 'first book',
        lastName: this.decimalPipe.transform(2, '.1'),
        Address: this.currencyPipe.transform(15),
        Mobile: this.percentPipe.transform(0, '.2'),
      },
      {
        id: 2,
        firstName: 'second book',
        lastName: this.decimalPipe.transform(1, '.1'),
        Address: this.currencyPipe.transform(42.5),
        Mobile: this.percentPipe.transform(0.1, '.2'),
      },
      {
        id: 3,
        firstName: 'third book',
        lastName: this.decimalPipe.transform(4, '.1'),
        Address: this.currencyPipe.transform(12.99),
        Mobile: this.percentPipe.transform(0.05, '.2'),
      },
      {
        id: 4,
        firstName: 'fourth book',
        lastName: this.decimalPipe.transform(1, '.1'),
        Address: this.currencyPipe.transform(19.99),
        Mobile: this.percentPipe.transform(0.02, '.2'),
      },
      {
        id: 5,
        firstName: 'fifth book',
        lastName: this.decimalPipe.transform(8),
        Address: this.currencyPipe.transform(10.25),
        Mobile: this.percentPipe.transform(0.2, '.2'),
      },
    ];
  }

  logout() {
    this.notifierService.error('Logout');
    localStorage.clear();
    this.router.navigate(['/auth/sign-in']);
  }

  sendNotification() {
    let data = {
      createdBy: 1,
      Description: 'test the notification from admin',
      Title: 'hey world !!',
      UserId: 4,
      OrganizationId: 1025,
      type: 'single',
    };
    console.log(data);
    this.signalrService.SendNotification(data);
  }

  sendNotification2() {
    let data = {
      createdBy: 1,
      Description: 'test the notification from admin ',
      Title: 'hey world !!',
      UserId: 5,
      OrganizationId: 1025,
      type: 'single',
    };
    console.log(data);
    this.signalrService.SendNotification(data);
  }

  sendBroadcast() {
    let data = {
      createdBy: 1,
      Description: 'broadcasting the notification from admin ',
      Title: 'hey world !!',
      UserId: 3,
      OrganizationId: 1025,
      type: 'broadcasting',
    };
    console.log(data);
    this.signalrService.SendNotification(data);
  }
}
