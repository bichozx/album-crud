import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';

import { AddCommentsComponent } from '../add-comments/add-comments.component';
import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { IAlbum } from '../../models/album';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-album',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    CommonModule,
    AlbumDetailsComponent,
    AddCommentsComponent,
  ],
  templateUrl: './list-album.component.html',
  styleUrl: './list-album.component.css',
  providers: [NzModalService],
})
export class ListaAlbumComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private albumService = inject(AlbumService);
  private modal = inject(NzModalService);

  public list: any[] = [];
  public pagedList: any[] = [];
  public total = 0;
  public pageSize = 5;
  public currentPage = 1;
  public details: IAlbum | undefined;
  size: NzButtonSize = 'small';

  ngOnInit(): void {
    this.subscription = this.albumService
      .getAlbums()
      .subscribe((data: any[]) => {
        this.list = data;
        this.total = data.length;
        this.updatePagedList();
      });
  }

  updatePagedList(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedList = this.list.slice(startIndex, endIndex);
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.updatePagedList();
  }

  onPageIndexChange(newPageIndex: number): void {
    this.currentPage = newPageIndex;
    this.updatePagedList();
  }

  viewDetails(id: any): void {
    this.albumService.getAlbumsById(id).subscribe((data) => {
      this.details = data;
      this.modal.create({
        nzTitle: 'Details',
        nzContent: AlbumDetailsComponent,
        nzData: { ...this.details },
        nzWidth: '80%',
        nzFooter: [
          {
            label: 'Aceptar',
            type: 'primary',
            onClick: () => {
              this.modal.closeAll();
            },
          },
        ],
        nzClosable: true,
      });
    });
  }

  createComment(id: any): void {
    this.modal.create({
      nzTitle: 'Add Comment',
      nzContent: AddCommentsComponent,
      nzData: { id: id },
      nzWidth: '80%',
      nzFooter: [
        {
          label: 'Close',
          type: 'primary',
          onClick: () => {
            this.modal.closeAll();
          },
        },
      ],
      nzClosable: true,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
