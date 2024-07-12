import { Component,HostBinding, Input, ViewEncapsulation } from '@angular/core';

interface IButtonProps { color: string; outline: boolean; isLoading: boolean; border: string;}

@Component({ selector: 'button[customButton], a[customButton]', templateUrl: './button.component.html', styleUrls: ['./button.component.scss'],
encapsulation: ViewEncapsulation.None })
export class ButtonComponent implements IButtonProps {

  constructor() { }

  @Input() border!: 'primary' | 'secondary' | 'danger' | 'disabled' | 'success';
  @Input() color!: 'primary' | 'secondary' | 'danger' | 'disabled' | 'success';
  @Input() isLoading!: boolean;
  @Input() label: string = '';
  @Input() set outline(value: boolean) { this._outline = value !== null && `${value}` !== 'false';}
  @Input() svgIcon: string | undefined = undefined;

  _outline!: boolean;

  @HostBinding('class.custom-button')
  _customButton = true;

  @HostBinding('class.custom-button--danger')
  get danger(): boolean { return !this._outline && this.color === 'danger'; }

  @HostBinding('class.custom-button--disabled')
  get disabled(): boolean { return !this._outline && this.color === 'disabled'; }

  @HostBinding('class.custom-button--primary')
  get primary(): boolean { return !this._outline && this.color === 'primary'; }

  @HostBinding('class.custom-button--secondary')
  get secondary(): boolean { return !this._outline && this.color === 'secondary'; }

  @HostBinding('class.custom-button--success')
  get success(): boolean { return !this._outline && this.color === 'success'; }

  @HostBinding('class.custom-button--outline-danger')
  get _outlineDanger(): boolean { return this._outline && this.border === 'danger'; }

  @HostBinding('class.custom-button--outline-disabled')
  get _outlineGray(): boolean { return this._outline && this.border === 'disabled'; }

  @HostBinding('class.custom-button--outline-primary')
  get _outlinePrimary(): boolean { return this._outline && this.border === 'primary'; }

  @HostBinding('class.custom-button--outline-secondary')
  get _outlineSecondary(): boolean { return this._outline && this.border === 'secondary'; }

  @HostBinding('class.custom-button--outline-success')
  get _outlineSuccess(): boolean { return this._outline && this.border === 'success'; }

}
