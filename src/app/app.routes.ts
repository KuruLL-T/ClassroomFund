import { Routes } from '@angular/router';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';

export const routes: Routes = [
    { path: '', component: RoomsListComponent },
    { path: 'room-detail/:id', component: RoomDetailComponent }
];
