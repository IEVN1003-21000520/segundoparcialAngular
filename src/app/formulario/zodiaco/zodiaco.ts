import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-zodiaco',
  standalone: true,
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {

  nombre: string = '';
  apellidoP: string = '';
  apellidoM: string = '';
  dia: number | null = null;
  mes: number | null = null;
  anio: number | null = null;
  sexo: string = '';

  resNombre: string = '';
  resSexo: string = '';
  edadCalculada: number | null = null;
  signo: string = '';
  imagenSigno: string = '';
  mostrarResultado: boolean = false;

  imprimir(): void {
    if (!this.nombre || !this.apellidoP || !this.apellidoM || !this.dia || !this.mes || !this.anio || !this.sexo) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    this.resNombre = `${this.nombre} ${this.apellidoP} ${this.apellidoM}`;
    this.resSexo = this.sexo;

    const hoy = new Date();
    const nacimiento = new Date(this.anio, this.mes - 1, this.dia);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    
    if (hoy < new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())) {
      edad--;
    }
    this.edadCalculada = edad;

    this.calcularSigno(this.anio);
    this.mostrarResultado = true;
  }

  calcularSigno(anio: number): void {
    const residuo = anio % 12;

    switch (residuo) {
      case 0:
        this.signo = 'mono';
        this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg';
        break;
      case 1:
        this.signo = 'gallo';
        this.imagenSigno = 'https://media.istockphoto.com/id/600056740/es/vector/a%C3%B1o-del-gallo-papercut.jpg';
        break;
      case 2:
        this.signo = 'perro';
        this.imagenSigno = 'https://media.istockphoto.com/id/896080352/es/vector/perro-de-papel-cortado.jpg';
        break;
      case 3:
        this.signo = 'cerdo';
        this.imagenSigno = 'https://www.shutterstock.com/image-vector/chinese-zodiac-sign-year-pigred-260nw-1096440221.jpg';
        break;
      case 4:
        this.signo = 'rata';
        this.imagenSigno = 'https://img.lagaceta.com.ar/fotos/notas/2023/10/19/horoscopo-chino-le-depara-ano-dragon-rata-1010560-103743.png';
        break;
      case 5:
        this.signo = 'buey';
        this.imagenSigno = 'https://peopleenespanol.com/thmb/ia0u33jxk7_bfFTLf1viDW9j5LA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/horoscopo-chino-buey-de-metal-2021-e93c7ebe89ab4c0daa8704d6e4a827dd.png';
        break;
      case 6:
        this.signo = 'tigre';
        this.imagenSigno = 'https://cloudfront-us-east-1.images.arcpublishing.com/elcronista/CHA7CE6RWRHEXPCAPY67JUNLPI.jpg';
        break;
      case 7:
        this.signo = 'conejo';
        this.imagenSigno = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1E_Nl-rl8sdR8SWqsxTngMiBJIi7sEBbail0KQy5RQyddallOosUBrW8&s=10';
        break;
      case 8:
        this.signo = 'dragón';
        this.imagenSigno = 'https://heraldodemexico.com.mx/u/fotografias/m/2021/12/14/f1280x720-455273_586948_5050.jpg';
        break;
      case 9:
        this.signo = 'serpiente';
        this.imagenSigno = 'https://thumbs.dreamstime.com/b/hor%C3%B3scopo-chino-signo-serpiente-con-flores-vector-s%C3%ADmbolos-astrol%C3%B3gicos-orientales-aislado-decorado-floraci%C3%B3n-flora-cultura-207697973.jpg';
        break;
      case 10:
        this.signo = 'caballo';
        this.imagenSigno = 'https://media.istockphoto.com/id/932747220/es/vector/caballo-signo-del-zodiaco.jpg';
        break;
      case 11:
        this.signo = 'cabra';
        this.imagenSigno = 'https://thumbs.dreamstime.com/b/signo-del-hor%C3%B3scopo-chino-astrolog%C3%ADa-s%C3%ADmbolo-de-cabra-con-cuernos-la-animal-aislado-criatura-lunar-a%C3%B1o-nuevo-corte-papel-207698175.jpg';
        break;
    }
  }
}