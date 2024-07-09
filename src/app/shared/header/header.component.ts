import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { LocalStorageUtils } from '../../core/_utils/localstorage';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

export interface ISidebarData {
  routeLink: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('header', { read: ElementRef }) header!: ElementRef;
  public logo: string = './../../../assets/icons/logo-brown.svg';

  mdq!: MediaQueryList;
  mediaQueryListener!: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router
  ) {
    this.mdq = media.matchMedia('(max-width: 992px)');
    this.mediaQueryListener = () => changeDetectorRef.detectChanges();
    this.mdq.addListener(this.mediaQueryListener);
  }

  ngOnInit() {}

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
