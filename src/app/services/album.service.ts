import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { IAlbum } from '../models/album';
import { IComment } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrlBase = 'http://149.56.23.23:3000/';

  private http = inject(HttpClient);

  constructor() {}

  getAlbums(): Observable<any> {
    return this.http.get(`${this.apiUrlBase}albums`);
  }

  getAlbumsById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlBase}albums/${id}`);
  }

  postCreateAlbum(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrlBase}albums`, payload);
  }

  postComentAlbum(albumId: number, payload: any): Observable<any> {
    return this.http.post(
      `${this.apiUrlBase}albums/${albumId}/comments`,
      payload
    );
  }
}
