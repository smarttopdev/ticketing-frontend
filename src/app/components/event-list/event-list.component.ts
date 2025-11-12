import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'availableTickets', 'action'];
  events: Event[] = [];
  loading = false;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    this.eventService.getAll().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snack.open('Failed to load events', 'Close', { duration: 3000 });
      }
    });
  }

  openBookDialog(event: Event) {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px',
      data: event
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') this.loadEvents();
    });
  }
}