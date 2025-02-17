import { AlbumDetailsComponent } from './album-details.component';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { TestBed } from '@angular/core/testing';

describe('AlbumDetailsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_MODAL_DATA, useValue: {} }],
    });
  });

  it('should create', () => {
    const component = TestBed.createComponent(AlbumDetailsComponent);
    expect(component).toBeTruthy();
  });
});
