import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  count = 1;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public event: Event,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    private eventService: EventService,
    private snack: MatSnackBar
  ) {}

  book() {
    this.loading = true;
    this.eventService.book(this.event.id, this.count).subscribe({
      next: (updated) => {
        this.loading = false;
        this.snack.open(
          `Successfully booked ${this.count} tickets for ${updated.name}!`,
          'Close',
          { duration: 3000 }
        );
        this.dialogRef.close('refresh');
      },
      error: (err) => {
        this.loading = false;
        const msg = err.error?.message || 'Booking failed';
        this.snack.open(msg, 'Close', { duration: 4000 });
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
