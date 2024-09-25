import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { tap } from 'rxjs';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterModule, UpperCasePipe, DatePipe, PaginatorComponent, DetalleComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginator: any;
  clienteSeleccionado: Cliente;

  constructor(
      private service: ClienteService,
      private modalService: ModalService,
      private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.service.getClientes(page).pipe(tap((response: any) => {
        // console.log('Tap 3');
        (response.content as Cliente[]).forEach(cliente => {
          // console.log(cliente.nombre);
        })
      }))
      .subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginator = response;
      });
    });

    this.modalService.notificarUpload.subscribe(cliente => {{
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    }});
  }

  delete(cliente: Cliente): void{
    Swal.fire({
      title: "Estás seguro?",
      text: `Vas a eliminar el cliente ${cliente.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(cliente.id).subscribe(
          () => {
            Swal.fire({
              title: "Eliminado!",
              text: `El cliente ${cliente.nombre} ha sido eliminado.`,
              icon: "success"
            }).then( () => {
              this.clientes = this.clientes.filter( c => c !== cliente)
            })
          }
        )
      }
    });
  }

  openModal(cliente: Cliente){
    
    this.clienteSeleccionado = cliente;
    this.modalService.openModal();
  }

}
