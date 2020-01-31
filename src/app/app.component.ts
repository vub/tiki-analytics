import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
  }

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

    // this.http.get('https://tiki.vn/api/v2/me/orders?page=1&limit=1000000').subscribe(result => {
    //   console.log('result');
    //   console.log(result);
    // });

    // https://tiki.vn/api/v2/me/orders/546858057?include=items,price_summary,child_orders
    // https://tiki.vn/api/v2/me/orders/855632613?include=items,price_summary,child_orders
    // https://tiki.vn/api/v2/me
  }
}
