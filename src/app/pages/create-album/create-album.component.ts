import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AlbumService } from '../../services/album.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [
    FormsModule,
    NzDropDownModule,
    NzButtonModule,
    NzUploadModule,
    NzIconModule,
    NzCardModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzDatePickerModule,
  ],
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css'],
  animations: [],
})
export class CreateAlbumComponent {
  checked: boolean = false;
  private fb = inject(NonNullableFormBuilder);
  private albumService = inject(AlbumService);

  constructor(private notification: NzNotificationService) {}

  fileList: any[] = [];

  validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    cover: this.fb.control('', [Validators.required]),
    releaseDate: this.fb.control<Date | null>(null),
    description: this.fb.control('', [Validators.required]),
    genre: this.fb.control('', [Validators.required]),
    recordLabel: this.fb.control('', [Validators.required]),
  });

  submitForm() {
    if (this.validateForm.valid) {
      this.albumService
        .postCreateAlbum(this.validateForm.value)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.notification
              .blank('Album Created', 'The Album was created successfully')
              .onClick.subscribe(() => {
                console.log('Notification clicked!');
              });

            window.location.reload();
          },
          (error) => {
            console.error('Error creating album:', error);
          }
        );
    }
  }

  handleChange($event: any) {
    const obj = $event.fileList.pop();
    this.fileList = [obj];
    this.convertToBase64(this.fileList[0].originFileObj);
  }

  selectGenre(genre: string) {
    this.validateForm.patchValue({ genre: genre });
  }

  selectRecordLabel(recordLabel: string) {
    this.validateForm.patchValue({ recordLabel: recordLabel });
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Lee el archivo como URL de datos

    reader.onload = () => {
      const base64String = reader.result as string;
      this.validateForm.patchValue({ cover: base64String });
    };

    reader.onerror = (error) => {
      console.error('Error converting file to Base64:', error);
    };
  }
}
