import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { tap } from 'rxjs';
import { PaginatorComponent } from '../components/paginator/paginator.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterModule, UpperCasePipe, DatePipe, PaginatorComponent],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginator: any;

  constructor(
      private service: ClienteService,
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
    })
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

}
