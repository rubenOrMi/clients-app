import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import{MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { Region } from './region';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatMomentDateModule, MatDatepickerModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  titulo: string = 'Crear Cliente';
  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    createAt: '',
    foto: '',
    region: undefined
  };

  regiones: Region[];

  public errors: string[];

  constructor(
      private service: ClienteService, 
      private router: Router,
      private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.loadCliente();
    this.service.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  loadCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.service.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  create(){
    this.service.create(this.cliente).subscribe(
      (cliente) => {
        console.log(cliente);
        Swal.fire({
          title: 'Usuario guardado',
          text: `El cliente ${cliente.nombre} ha sido creado con éxito!`,
          icon: 'success'
        }).then( () => this.router.navigate(['/clientes'])
        )
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  
  update(): void {
    this.service.update(this.cliente).subscribe(
      (cliente) => {
        Swal.fire({
          title: 'Cliente Actualizado',
          text: `El cliente ${cliente.nombre} ha sido actualizado con éxito!`,
          icon: 'success'
        }).then( () => this.router.navigate(['/clientes']))
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend ' + err.status);
        console.error(err.error.errors);
      }
    )
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
