import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
      private http: HttpClient,
      private router: Router) { }

  getClientes(page:number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/clientes/page/${page}`).pipe(
      tap((response: any) => {
        // console.log('Tap 1');
        (response.content as Cliente[]).forEach( cliente => {
          // console.log(cliente.nombre);
        })        
      }),
      map( (response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // registerLocaleData(localeEs, 'es');
          // let datePipe = new DatePipe('es');
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US')
          // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        // console.log('Tap 2');
        (response.content as Cliente[]).forEach( cliente => {
          // console.log(cliente.nombre);
        })
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/clientes/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        // console.log(e);
        Swal.fire({
          title: 'Error!',
          text: e.error.mensaje,
          icon: 'error'
        });

        return throwError(() => e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(`${this.urlEndPoint}/clientes`, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status == 400) {
          return throwError(() => e);
        }

        this.router.navigate(['/clientes']);
        console.log(e);
        
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.errors,
          icon: 'error'
        });

        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/clientes/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status == 400) {
          return throwError(() => e);
        }

        this.router.navigate(['/clientes']);
        console.log(e);
        
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.errors,
          icon: 'error'
        });

        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/clientes/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e);
        
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error'
        });

        return throwError(() => e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/clientes/upload`, formData, {
      reportProgress: true
    })

    return this.http.request(req);
  } 
}
