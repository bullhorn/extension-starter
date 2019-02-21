import {Injectable, ViewContainerRef} from '@angular/core';
import {NovoToastService} from "novo-elements";


export class ToastService {

  private toastService: NovoToastService;

  constructor(toastService: NovoToastService, viewRef: ViewContainerRef) {
    toastService.parentViewContainer = viewRef;
    this.toastService = toastService;
  }

  public success(message: string, title: string = 'Success', icon: string = 'check'): void {
    this.toastService.alert({
      title: title,
      message: message,
      icon: icon,
      theme: 'success',
      position: 'growlTopRight'
    });
  }

  public danger(message: string, title: string = 'Error', icon: string = 'caution'): void {
    this.toastService.alert({
      title: title,
      message: message,
      icon: icon,
      theme: 'danger',
      position: 'growlTopRight'
    });
  }

}
