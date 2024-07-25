import { Auth } from '@angular/fire/auth';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventDataService } from '../../_services/eventData.service';
import { EventInterface } from '../../_models/event.interface';
import { EventTypeEnum } from '../../../../core/_utils/EventType.enum';

@Component({ selector: 'app-event-form', templateUrl: './event-form.component.html', styleUrl: './event-form.component.scss' })
export class EventFormComponent {
  @ViewChild('content') content!: TemplateRef<any>;

  closeResult = '';
  errorMessage: string | null = null;
  form!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  EventTypeEnum = EventTypeEnum;

  constructor(
    private firebaseAuth: Auth,
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private eventDataService: EventDataService
  ) {}

  ngOnInit(): void {
    this.createForm();
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
    this.form = this.formBuilder.group({
        local: ['', Validators.required],
        date_at: ['',Validators.required],
        hour_at: ['',Validators.required], 
        type: ['',Validators.required]
    });
  }

  doSave() : void {
    const formData = this.form.getRawValue();

    const event : EventInterface = {
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

  open(event?: EventInterface) {    
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

}