import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  titulo: string = "Detalle del cliente";

  cliente: Cliente;

  fotoSeleccionada: File;

  progreso: number = 0;

  constructor(private service: ClienteService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id){
        this.service.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada != null && this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire({
        title: 'Error al seleccionar',
        text: 'Debe seleccionar una imagen',
        icon: 'error'
      });
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire({
        title: 'Error al subir',
        text: 'Debe subir una imagen',
        icon: 'error'
      });
    }else {
      this.service.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          } else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            Swal.fire({
              title: 'Foto subida',
              text: response.mensaje,
              icon: 'success'
            });
          }
        }
      );
    }
  }

}
