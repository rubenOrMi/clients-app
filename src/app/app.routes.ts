import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { FormComponent } from './clientes/form.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';

export const routes: Routes = [
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'clientes/form', component: FormComponent},
    {path: 'clientes/form/:id', component: FormComponent},
    // {path: 'clientes/detalle/:id', component: DetalleComponent},

];
