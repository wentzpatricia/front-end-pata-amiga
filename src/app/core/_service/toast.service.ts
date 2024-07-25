import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

    toastError(title: string, message: string) {
        this.toastr.error(message, title, { closeButton: true, progressBar: true });
    }

    toastInfo(title: string, message: string) {
        this.toastr.info(message, title, { closeButton: true, progressBar: true });
    }

    toastSuccess(title: string, message: string) {
        this.toastr.success(message, title, { closeButton: true, progressBar: true });
    }

    toastWarning(title: string, message: string) {
        this.toastr.warning(message, title, { closeButton: true, progressBar: true });
    }
}
