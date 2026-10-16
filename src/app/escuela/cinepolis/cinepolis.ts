import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cinepolis',
  imports: [FormsModule, CommonModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css',
})
export class Cinepolis {
  precioBoleto: number = 12.00;
  maxPorPersona: number = 7;

  nombre: string = '';
  compradores: number = 1;
  boletos: number = 0;
  tieneCineco: string = 'no';

  mostrarTicket: boolean = false;
  mensajeError: string = '';

  ticketNombre: string = '';
  ticketBoletos: number = 0;
  ticketSubtotal: number = 0;
  descCantidadText: string = '';
  descCinecoText: string = '';
  ticketTotal: number = 0;

  procesar(): void {
    var maximoPermitido: number = this.compradores * this.maxPorPersona;

    if (this.boletos > maximoPermitido) {
      this.mensajeError = 'Error: ' + this.compradores + ' comprador(es) no pueden comprar más de ' + maximoPermitido + ' boletos en total.';
      this.mostrarTicket = false;
      return;
    }

    this.mensajeError = '';

    var subtotal: number = this.boletos * this.precioBoleto;

    var porcentajeBoletos: number = 0;
    var textoDescBoleto: string = '• Sin descuento por cantidad';

    if (this.boletos > 5) {
      porcentajeBoletos = 0.15;
      textoDescBoleto = '• Descuento por cantidad (15%): -$' + (subtotal * 0.15).toFixed(2);
    } else if (this.boletos >= 3) {
      porcentajeBoletos = 0.10;
      textoDescBoleto = '• Descuento por cantidad (10%): -$' + (subtotal * 0.10).toFixed(2);
    }

    var subtotalConDescuento: number = subtotal - (subtotal * porcentajeBoletos);

    var descuentoCineco: number = 0;
    var textoDescCineco: string = '• Sin descuento Tarjeta CINECO';

    if (this.tieneCineco === 'si') {
      descuentoCineco = subtotalConDescuento * 0.10;
      textoDescCineco = '• Descuento Tarjeta CINECO (10% adicional): -$' + descuentoCineco.toFixed(2);
    }

    var totalFinal: number = subtotalConDescuento - descuentoCineco;

    this.ticketNombre = this.nombre;
    this.ticketBoletos = this.boletos;
    this.ticketSubtotal = subtotal;
    this.descCantidadText = textoDescBoleto;
    this.descCinecoText = textoDescCineco;
    this.ticketTotal = Number(totalFinal.toFixed(2));

    this.mostrarTicket = true;
  }

  limpiar(): void {
    this.nombre = '';
    this.compradores = 1;
    this.boletos = 0;
    this.tieneCineco = 'no';
    this.mostrarTicket = false;
    this.mensajeError = '';
  }
}