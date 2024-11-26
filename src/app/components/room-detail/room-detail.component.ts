import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ClassRoomTreeDto, ROOMS } from '../../models/room.model';
import { CommonModule } from '@angular/common';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
  imports: [CommonModule, KENDO_BUTTONS]
})
export class RoomDetailComponent implements OnInit {

  router = inject(Router);

  returnBack(){
    this.router.navigateByUrl('');
  }
  
  roomDetail: ClassRoomTreeDto | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    const allRooms = ROOMS.flatMap(building => building.classRooms);
    this.roomDetail = allRooms.find(room => room.classRoomId === roomId);
  }

  
}