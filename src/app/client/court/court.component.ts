import { Component } from '@angular/core';
import { NgFor,NgIf ,NgClass} from '@angular/common';
interface ScheduleStatus {
  [key: string]: number[];
}
@Component({
  selector: 'app-court',
  standalone: true,
  imports: [NgFor,NgIf ,NgClass],
  templateUrl: './court.component.html',
  styleUrl: './court.component.css'
})

export class CourtComponent {
  timeSlots: string[] = [
    '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00',
  ];

  fields: string[] = ['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4', 'Sân 5', 'Sân 6'];

  mockSchedule: ScheduleStatus = {
    'Sân 1': [1,1,2,0,1,1,2,2,2,0,1,1,1,2,2,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
    'Sân 2': [1,1,1,2,2,1,1,1,1,2,2,2,1,1,1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    'Sân 3': [2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    'Sân 4': [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    'Sân 5': [1,1,1,1,2,1,1,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    'Sân 6': [2,2,2,2,1,1,1,1,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
  };

  getStatusClass(status: number): string {
    switch (status) {
      case 0: return 'bg-white';
      case 1: return 'bg-red-500';
      case 2: return 'bg-gray-400';
      default: return 'bg-white';
    }
  }
}

