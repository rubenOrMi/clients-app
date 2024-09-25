import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(){
    return this._notificarUpload;
  }

  set notificarUpload(notificarUpload: EventEmitter<any>){
    this._notificarUpload = notificarUpload;
  }

  openModal(){
    this.modal = true;
  }
  
  closeModal(){
    this.modal = false;
  }
}
