import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/albumList' },
  {
    path: 'albumList',
    loadChildren: () =>
      import('./pages/list-album/list-album.routes').then((m) => m.LISTA_ALBUM),
  },
  {
    path: 'createAlbum',
    loadChildren: () =>
      import('./pages/create-album/create-album.routes').then(
        (m) => m.CREAR_ALBUM
      ),
  },
];
