import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  courseList = ['Business', 'Computers', 'Programming', 'Science'];
  actionBtn: string = 'Save';
  courseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      ID: ['', Validators.required],
      category: ['', Validators.required],
      bookName: ['', Validators.required],
      price: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.courseForm.controls['ID'].setValue(this.editData.ID);
      this.courseForm.controls['bookName'].setValue(this.editData.bookName);
      this.courseForm.controls['category'].setValue(this.editData.category);
      this.courseForm.controls['price'].setValue(this.editData.price);
    }
  }

  addEntry() {
    console.log('here');
    console.log(!this.editData);
    if (!this.editData) {
      if (this.courseForm.valid) {
        this.api.postEntry(this.courseForm.value).subscribe({
          next: (res) => {
            alert('Product added sucessfully');
            this.courseForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error when adding ther entry');
          },
        });
      }
    } else {
      this.updateRecord();
    }
  }

  updateRecord() {
    console.log('here2');
    this.api.putRecord(this.courseForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product updated successfully');
        this.courseForm.reset;
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error when updating the record');
      },
    });
  }
}
