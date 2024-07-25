import { Auth, authState } from '@angular/fire/auth';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventInterface } from '../../_models/event.interface';
import { EventDataService } from '../../_services/eventData.service';
import { EventTypeEnum } from '../../../../core/_utils/EventType.enum';

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
  EventTypeEnum = EventTypeEnum;

  constructor(
    private firebaseAuth: Auth,
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private eventDataService: EventDataService
  ) {this.currentUser$ = authState(this.firebaseAuth);}

  ngOnInit(): void {
    this.createForm();
  }

  open(event?: any) {    
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
        local: ['', Validators.required],
        date_at: ['',Validators.required],
        hour_at: ['',Validators.required], 
        type: ['',Validators.required]
      }
    );
  }

  doSave() : void {
    const formData = this.form.getRawValue()

  
    let event : EventInterface = {
      uid: Math.random().toString(),
      date_at: new Date(formData.date_at + 'T' + formData.hour_at),
      local: formData.local,
      type: formData.type,
      user: this.firebaseAuth.currentUser?.uid
    }

    this.eventDataService.save(event).then(() => {
      this.modalService.dismissAll()
    }).catch((err) => {
      console.log(err)
    })
  }
}
