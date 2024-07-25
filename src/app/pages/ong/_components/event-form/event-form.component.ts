import { Auth } from '@angular/fire/auth';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  formTitle = 'Novo Evento'
  event: EventInterface | null = null
  editForm : boolean = false

  constructor(
    private firebaseAuth: Auth,
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private eventDataService: EventDataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private formatDate(date: Date, type?: any) {
    if (type !== undefined && type === 'time') {
      return this.datePipe.transform(date, 'HH:mm');
    }
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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
    if (this.event !== null) {
      this.form = this.formBuilder.group({
        local: [this.event.local, Validators.required],
        date_at: [this.formatDate(this.event.date_at), Validators.required],
        hour_at: [this.formatDate(this.event.date_at, 'time'), Validators.required], 
        type: [this.event.type, Validators.required]
      });
    } else {
      this.form = this.formBuilder.group({
        local: ['', Validators.required],
        date_at: ['',Validators.required],
        hour_at: ['',Validators.required], 
        type: ['',Validators.required]
      });
    }
  }

  doSave() : void {
    const formData = this.form.getRawValue()

    let uid = Math.random().toString() 

    if (this.editForm) {
      if(this.event !== null)
        uid = this.event.uid 
    }

    let event : EventInterface = {
      uid: uid,
      date_at: new Date(formData.date_at + 'T' + formData.hour_at),
      local: formData.local,
      type: formData.type,
      user: this.firebaseAuth.currentUser?.uid
    }

    if (this.editForm) {
      this.eventDataService.update(event).then(() => {
        this.modalService.dismissAll()
        window.location.reload()
        this.editForm = false
      }).catch((err) => {
        console.log(err)
      })
    } else {
      this.eventDataService.save(event).then(() => {
        this.modalService.dismissAll()
        window.location.reload()
        this.editForm = false
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  open(event?: any) {
    if (event !== undefined) {
      this.formTitle = 'Editar Evento'
      this.event = event
      this.editForm = true
    } else {
      this.formTitle = 'Novo Evento'
      this.event = null
      this.editForm = false
    }

    this.createForm()

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
