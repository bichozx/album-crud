import { Component, inject, Inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-add-comments',
  standalone: true,
  imports: [NzFormModule, NzModalModule, ReactiveFormsModule, NzButtonModule],
  templateUrl: './add-comments.component.html',
  styleUrl: './add-comments.component.css',
})
export class AddCommentsComponent {
  private fb = inject(NonNullableFormBuilder);
  private albumService = inject(AlbumService);
  private modalRef = inject(NzModalRef);

  constructor(
    @Inject(NZ_MODAL_DATA) public data: { id: any },
    private notification: NzNotificationService
  ) {}
  validateForm = this.fb.group({
    description: this.fb.control('', [Validators.required]),
    rating: this.fb.control('', [Validators.required]),
    collector: this.fb.control({ id: 1 }),
  });
  submitForm() {
    if (this.validateForm.valid) {
      const payload = {
        ...this.validateForm.value,
        collector: { id: 1 },
      };

      this.albumService.postComentAlbum(this.data.id, payload).subscribe({
        next: () => {
          this.notification.blank(
            'Comment Added',
            'The Comment was added successfully'
          );
          this.modalRef.close();
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        },
      });
    }
  }
}
