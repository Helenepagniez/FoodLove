import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogSavedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSavedComponent>) {}
  ngOnInit(): void {
    
  }

  cancel(): void {
    this.dialogRef.close(true);
  }

  saved(): void {
    this.dialogRef.close(false);
  }
}

