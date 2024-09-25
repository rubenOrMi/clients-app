import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  titulo: string = "Detalle del cliente";

  @Input() cliente: Cliente;

  fotoSeleccionada: File;

  progreso: number = 0;

  constructor(
      private service: ClienteService,
      public modalService: ModalService) {}
  
  ngOnInit(): void {
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
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

            this.modalService.notificarUpload.emit(this.cliente);

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

  closeModal(){
    this.modalService.closeModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
