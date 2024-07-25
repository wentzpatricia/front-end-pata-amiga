import { Auth, authState } from '@angular/fire/auth';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-form', 
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  @ViewChild('content') content!: TemplateRef<any>;
  currentUser$!: Observable<User | null>;
  errorMessage: string | null = null;
  form!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  closeResult = '';
  image = './../../../assets/images/background-login.png';
  logo = './../../../assets/icons/logo-brown.svg';

  constructor(
    private firebaseAuth: Auth,
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,   
     
  ) {this.currentUser$ = authState(this.firebaseAuth);}

ngOnInit(): void {
  this.createForm();
}

open() {
  console.log("euaihaeiuhaeui")
  this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
  switch (reason) {
    case ModalDismissReasons.ESC:
      return 'by pressing ESC';
    case ModalDismissReasons.BACKDROP_CLICK:
      return 'by clicking on a backdrop';
    default:
      return `with: ${reason}`;
  }
}
createForm() {
  this.form = this.formBuilder.group(
    {
        local: ['IGUATEMI'],
        date_f: ['12/07/2024'],
        hour_f: ['12:00'],        
      
    }    
  );
}

}
