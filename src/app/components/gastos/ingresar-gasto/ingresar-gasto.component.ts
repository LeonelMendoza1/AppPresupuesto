import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit{

  nombreGasto: string;
  cantidad: number;
  textIncorrecto: string;
  formularioIncorrecto: boolean;

  constructor(private _presupuestoService: PresupuestoService){
    this.nombreGasto = '';
    this.cantidad = 0;
    this.textIncorrecto = '';
    this.formularioIncorrecto = false;
  }

  ngOnInit(): void {
    
  }

  agregarGasto(){
    if(this.cantidad > this._presupuestoService.restante){
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Cantidad ingresada es mayor al restante';
      return;
    }

    if(this.nombreGasto === '' || this.cantidad <= 0){
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Nombre gasto o cantidad incorrecta';
    }else{

      //crea el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      //se envia el objeto a los subcriptores via subjet
      this._presupuestoService.agregarGasto(GASTO);

      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
