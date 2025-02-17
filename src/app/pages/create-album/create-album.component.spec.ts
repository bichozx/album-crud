import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { AlbumService } from '../../services/album.service';
import { CreateAlbumComponent } from './create-album.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaAlbumComponent } from '../list-album/list-album.component';

describe('CreateAlbumComponent', () => {
  let component: CreateAlbumComponent;
  let fixture: ComponentFixture<CreateAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CreateAlbumComponent,
        AlbumDetailsComponent,
        ListaAlbumComponent,
      ],
      providers: [AlbumService],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
