import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private route:Router, private api:AppService){

  }

  addressDetails: any = []
  proceedToPayStatus: boolean = false;
  makePaymentStatus: boolean = false;
  grandTotal: any = 0
  public payPalConfig?: IPayPalConfig;
  ngOnInit(): void {
    this.initConfig();
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        alert("Payment success");
        this.api.emptycart();
        this.api.getCartCount();
        this.proceedToPayStatus = false;
        this.makePaymentStatus = false;
        this.route.navigateByUrl("")
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert("Payment failed");
        this.proceedToPayStatus=true;

      },
      onError: err => {
        console.log('OnError', err);
        alert("Transaction failed, Please try after some time");
        this.proceedToPayStatus = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      
      }
    };
  }
  proceedToBuy() {
    this.grandTotal = sessionStorage.getItem("total")

    const { username, apartment, place, pincode } = this.addressDetails;
    console.log(this.addressDetails)
    if (!username || !apartment || !place || !pincode) {
      alert("Please fill the form completely")
    }
    else {
      this.proceedToPayStatus = true;

    }
  }

  back() {
    this.proceedToPayStatus = false;
  }

  makePayment() {
    this.makePaymentStatus = true;
  }

}
