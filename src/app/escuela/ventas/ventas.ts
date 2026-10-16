import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styles: []
})
export class Ventas implements OnInit {
  ventas: any[] = [];
  
  mostrarModal: boolean = false;
  indiceEditando: number = -1;
  mensajeError: string = '';
  maxPorPersona: number = 7;

  ventaEditada: any = {
    nombre: '',
    compradores: 1,
    boletos: 0,
    descCantidadText: '',
    descCinecoText: '',
    total: 0
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const datos = localStorage.getItem('ventas_cinepolis');
    if (datos) {
      this.ventas = JSON.parse(datos);
    }
  }

  eliminar(index: number): void {
    this.ventas.splice(index, 1);
    localStorage.setItem('ventas_cinepolis', JSON.stringify(this.ventas));
  }

  abrirEditar(index: number): void {
    this.indiceEditando = index;
    this.ventaEditada = { ...this.ventas[index] };
    this.mensajeError = '';
    this.mostrarModal = true;
  }

  guardarEdicion(): void {
    const maximoPermitido = this.ventaEditada.compradores * this.maxPorPersona;

    if (this.ventaEditada.boletos > maximoPermitido) {
      this.mensajeError = 'Error: ' + this.ventaEditada.compradores + ' comprador(es) no pueden comprar más de ' + maximoPermitido + ' boletos en total.';
      return; 
    }

    this.mensajeError = '';

    if (this.indiceEditando !== -1) {
      const precioBoleto = 12.00;
      let subtotal = this.ventaEditada.boletos * precioBoleto;
      let porcentajeBoletos = 0;
      let textoDescBoleto = '• Sin descuento por cantidad';

      if (this.ventaEditada.boletos > 5) {
        porcentajeBoletos = 0.15;
        textoDescBoleto = '• Descuento por cantidad (15%): -$' + (subtotal * 0.15).toFixed(2);
      } else if (this.ventaEditada.boletos >= 3) {
        porcentajeBoletos = 0.10;
        textoDescBoleto = '• Descuento por cantidad (10%): -$' + (subtotal * 0.10).toFixed(2);
      }

      let subtotalConDescuento = subtotal - (subtotal * porcentajeBoletos);
      
      let descuentoCineco = 0;
      if (this.ventaEditada.descCinecoText && this.ventaEditada.descCinecoText.includes('10%')) {
        descuentoCineco = subtotalConDescuento * 0.10;
      }

      let totalFinal = subtotalConDescuento - descuentoCineco;

      this.ventaEditada.descCantidadText = textoDescBoleto;
      this.ventaEditada.total = Number(totalFinal.toFixed(2));

      this.ventas[this.indiceEditando] = { ...this.ventaEditada };
      localStorage.setItem('ventas_cinepolis', JSON.stringify(this.ventas));
    }
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.indiceEditando = -1;
    this.mensajeError = '';
  }

  volver(): void {
    this.router.navigate(['/escuela/cinepolis']);
  }
}