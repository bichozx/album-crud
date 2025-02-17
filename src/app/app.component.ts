import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [],
})
export class AppComponent {
  title = 'album-crud';
  isCollapsed = false;
  private route = inject(Router);

  redirect(url: string) {
    this.route.navigate([url]);
  }
}
