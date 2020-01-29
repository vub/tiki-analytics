import { Component } from '@angular/core';
import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiki-analytics';
  apiResult = '';

  orders = {
    data: [],
    paging: {}
  };
  completedProject = [];
  totalSpent = 0;
  totalCompletedTransaction = 0;
  totalCancel = 0;

  updateResult() {
    this.orders = JSON.parse(this.apiResult);
    console.log(this.orders);
    this.completedProject = filter(this.orders.data, order => {
      return order.status === 'hoan_thanh';
    });
    this.totalSpent = sumBy(this.completedProject, order => {
      return order.grand_total;
    });
    this.totalCompletedTransaction = this.completedProject.length;
    const cancelOrder = filter(this.orders.data, order => {
      return order.status === 'canceled';
    });
    this.totalCancel = cancelOrder.length;
  }
}
