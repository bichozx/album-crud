import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddCommentsComponent } from './add-comments.component';
import { AlbumService } from '../../services/album.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal'; // Asegúrate de importar el token

describe('AddCommentsComponent', () => {
  let component: AddCommentsComponent;
  let fixture: ComponentFixture<AddCommentsComponent>;
  let albumService: jasmine.SpyObj<AlbumService>;
  let notificationService: jasmine.SpyObj<NzNotificationService>;
  let modalRef: jasmine.SpyObj<NzModalRef>;

  beforeEach(async () => {
    const albumServiceSpy = jasmine.createSpyObj('AlbumService', [
      'postComentAlbum',
    ]);
    const notificationServiceSpy = jasmine.createSpyObj(
      'NzNotificationService',
      ['blank']
    );
    const modalRefSpy = jasmine.createSpyObj('NzModalRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddCommentsComponent],
      providers: [
        { provide: AlbumService, useValue: albumServiceSpy },
        { provide: NzNotificationService, useValue: notificationServiceSpy },
        { provide: NzModalRef, useValue: modalRefSpy },
        { provide: NZ_MODAL_DATA, useValue: { id: 1 } },
        { provide: FormBuilder, useClass: FormBuilder },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommentsComponent);
    component = fixture.componentInstance;
    albumService = TestBed.inject(AlbumService) as jasmine.SpyObj<AlbumService>;
    notificationService = TestBed.inject(
      NzNotificationService
    ) as jasmine.SpyObj<NzNotificationService>;
    modalRef = TestBed.inject(NzModalRef) as jasmine.SpyObj<NzModalRef>;

    fixture.detectChanges();
  });

  it('should create the form with the correct fields', () => {
    expect(component.validateForm.contains('description')).toBeTrue();
    expect(component.validateForm.contains('rating')).toBeTrue();
    expect(component.validateForm.contains('collector')).toBeTrue();
  });

  it('should call postComentAlbum and show notification when form is valid', () => {
    component.validateForm.controls['rating'].setValue('5');

    const payload = {
      description: 'Test description',
      rating: component.validateForm.value.rating as string,
      collector: { id: 1 },
    };

    component.validateForm.setValue(payload);
    expect(component.validateForm.valid).toBeTrue();

    albumService.postComentAlbum.and.returnValue(of({}));
    component.submitForm();

    expect(albumService.postComentAlbum).toHaveBeenCalledOnceWith(
      component.data.id,
      payload
    );
    expect(notificationService.blank).toHaveBeenCalledWith(
      'Comment Added',
      'The Comment was added successfully'
    );
    expect(modalRef.close).toHaveBeenCalled();
  });

  it('should call postComentAlbum and show notification when form is valid', () => {
    component.validateForm.controls['rating'].setValue('5');

    const payload = {
      description: 'Test description',
      rating: component.validateForm.value.rating as string,
      collector: { id: 1 },
    };

    component.validateForm.setValue(payload);
    expect(component.validateForm.valid).toBeTrue();

    albumService.postComentAlbum.and.returnValue(of({}));
    component.submitForm();

    expect(albumService.postComentAlbum).toHaveBeenCalledOnceWith(
      component.data.id,
      payload
    );
    expect(notificationService.blank).toHaveBeenCalledWith(
      'Comment Added',
      'The Comment was added successfully'
    );
    expect(modalRef.close).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
