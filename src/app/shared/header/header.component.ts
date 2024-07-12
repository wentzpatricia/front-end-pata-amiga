import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { ISidebarData } from '../navbar-mobile/helper';
import { LocalStorageUtils } from '../../core/_utils/localstorage';
import { UserTypeEnum } from '../../core/_utils/UserType.enum';

@Component({ selector: 'app-header', templateUrl: './header.component.html', styleUrl: './header.component.scss' })
export class HeaderComponent {
  @Input() userType!: UserTypeEnum;
  @ViewChild('header', { read: ElementRef }) header!: ElementRef;

  mdq!: MediaQueryList; 
  mediaQueryListener!: () => void;

  volunteerNavData: ISidebarData[] = [
    { routeLink: '/volunteering/my-volunteering', labelTag: 'Meus voluntariados' },
    { routeLink: '/volunteering/events', labelTag: 'Eventos' },
  ];

  ongNavData: ISidebarData[] = [
    { routeLink: '/ong/events', labelTag: 'Eventos' },
  ];

  data: ISidebarData[] = [];
  logo: string = './../../../assets/icons/logo-brown.svg';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router
  ) {
    this.mdq = media.matchMedia('(max-width: 992px)');
    this.mediaQueryListener = () => changeDetectorRef.detectChanges();
    this.mdq.addListener(this.mediaQueryListener);
  }

  ngOnInit() {
    this.userType === UserTypeEnum.ONG ? this.data = this.ongNavData : this.data = this.volunteerNavData;
  }

  getActiveClass(data: ISidebarData): string {
    return data.routeLink && this.router.url.includes(data.routeLink)
      ? 'active'
      : '';
  }

  signOut() {
    const localStorageUtils = new LocalStorageUtils();
    localStorageUtils.setItem('login', false);
    this.router.navigate(['/auth/login']);
  }

  @HostListener('window:scroll') onWindowScroll() {
    if (window.scrollY > 1.5 && this.header && this.header.nativeElement) {
      this.header.nativeElement.style.boxShadow =
        '2px 4px 15px 1px rgba(0, 0, 0, 0.2)';
      this.header.nativeElement.style.backdropFilter = 'blur(20px)';
    } else if (this.header && this.header.nativeElement) {
      this.header.nativeElement.style.boxShadow = 'none';
      this.header.nativeElement.style.backdropFilter = 'none';
    }
  }
}
