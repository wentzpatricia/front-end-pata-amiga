import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ISidebarData, fadeInOut } from './helper';
import { Router } from '@angular/router';
import { LocalStorageUtils } from '../../core/_utils/localstorage';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

const navData: ISidebarData[] = [
  { routeLink: 'dashboard', labelTag: 'Meus voluntariados' },
  { routeLink: '', labelTag: 'Eventos' },
];

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.scss',
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '200ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(1turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class NavbarMobileComponent {
  public collapsed = false;
  public screenWidth = 0;
  public navsideData = navData;
  public multiple: boolean = false;
  public profileImage!: string;
  public title!: String;
  public sub!: string;
  public loadingImage!: boolean;
  public systemPicture: string | undefined;
  public logo: string = './../../../assets/icons/logo-brown.svg';

  constructor(public router: Router) {}
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @Output() darkThemeOn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('sidenavs', { read: ElementRef })
  elementNav: ElementRef | undefined;

  async ngOnInit(): Promise<void> {
    this.screenWidth = window.innerWidth;

    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  private addBodyOverlay(): void {
    document.body.classList.add('body-overlay');
  }

  private removeBodyOverlay(): void {
    document.body.classList.remove('body-overlay');
  }

  handleClickOutside(event: MouseEvent): void {
    const menuElement = this.elementNav?.nativeElement;

    if (
      this.collapsed &&
      menuElement &&
      !menuElement.contains(event.target as Node)
    ) {
      this.collapsed = !this.collapsed;

      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });

      this.removeBodyOverlay();
    }
  }

  public toggleCollapse(): void {
    if (this.collapsed) this.removeBodyOverlay();
    else this.addBodyOverlay();

    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  public handleClick(item: ISidebarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  public getActiveClass(data: ISidebarData): string {
    return data.routeLink && this.router.url.includes(data.routeLink)
      ? 'active'
      : '';
  }

  public shrinkItems(item: ISidebarData): void {
    if (this.multiple) return;

    for (let modelItem of this.navsideData) {
      if (item !== modelItem && modelItem.expanded) {
        modelItem.expanded = false;
      }
    }
  }

  signOut() {
    const localStorageUtils = new LocalStorageUtils();
    localStorageUtils.setItem('login', false);
    this.router.navigate(['/auth/login']);
  }
}
