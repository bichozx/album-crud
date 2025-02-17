import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [NzModalModule, CommonModule, NzTableModule],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.css',
})
export class AlbumDetailsComponent {
  constructor(@Inject(NZ_MODAL_DATA) public data: any) {}
}
