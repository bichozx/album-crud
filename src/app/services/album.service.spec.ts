import { AlbumService } from './album.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('AlbumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });
  });

  it('should be created', () => {
    const service: AlbumService = TestBed.inject(AlbumService);
    expect(service).toBeTruthy();
  });
});
