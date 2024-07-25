import { Component, Input } from '@angular/core';

@Component({ selector: 'app-empty', templateUrl: './empty.component.html', styleUrl: './empty.component.scss' })
export class EmptyComponent {
  @Input() isHtml: boolean = false;
  @Input() text: string = 'Lista vazia';
  @Input() heightWidth: string = '250px';
}
