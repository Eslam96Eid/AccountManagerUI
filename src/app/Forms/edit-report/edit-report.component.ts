import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<EditReportComponent>) { }

  ngOnInit(): void {
  }


  form: FormGroup = new FormGroup({
      $key: new FormControl(null),
      SampleSizeForEachteam: new FormControl('', Validators.required),
      Month: new FormControl(''),
      select:new FormControl('')
     
     
    });
  onSubmit(){
    
    // this.notificationService.success(':: Submitted successfully');
    this.onClose();

    }
  
  onClose(){
   
    this.form.reset();
   this._bottomSheetRef.dismiss();
   

  }

}
