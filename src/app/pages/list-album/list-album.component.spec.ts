import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaAlbumComponent } from './list-album.component';

describe('ListaAlbumComponent', () => {
  let component: ListaAlbumComponent;
  let fixture: ComponentFixture<ListaAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlbumComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
