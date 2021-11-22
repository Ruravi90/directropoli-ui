import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MercadopagoService } from '../../service/mercadopago.service';
declare const MercadoPago:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  mp:any;
  constructor(
    private mps:MercadopagoService
  ) { }

  async ngOnInit() {
    this.mp = new MercadoPago(environment.publicKey, {
      locale: 'es-MX'
    });
  }

  onplay(){
      // Initialize the checkout
      this.mp.checkout({
        preference: {
            id: '232825803-1d9dad89-d76c-4dfd-8f98-f41dc0583dcc'
        },
        autoOpen: true,
      });
  }



}
