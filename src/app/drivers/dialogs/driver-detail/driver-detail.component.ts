import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { RejectComponent } from '../reject/reject.component';
import { DriverService } from '../../services/driver.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {

  status = '';
  constructor(
    public dialog: MatDialog,
    private driverService: DriverService,
    private toastrService: ToastrService,
    public dialogRef: MatDialogRef<DriverDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.driver.status === 'inactive' && !data.driver.isRejected) {
      this.status = 'inactive';
    }
    if (data.driver.status === 'active' && !data.driver.isSuspended) {
      this.status = 'active';
    }
    if (data.driver.isSuspended) {
      this.status = 'suspended';
    }
    if (data.driver.isRejected) {
      this.status = 'rejected';
    }
  }

  ngOnInit() {
  }

  updateDriverAccount = (id, model) => {
    this.driverService.driverAccountUpdate(id, model).subscribe(
      data => {
        this.onNoClick();
        this.toastrService.error(data.message, '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      },
      err => {
        this.toastrService.error('Unable to update', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      }
    );
  }

  commentDialog(driver): void {
    if (this.status !== 'active') {
      const dialogRef = this.dialog.open(RejectComponent, {
        width: '450px',
        data: driver
      });
    }
  }

  onSave(driver) {
    const model: any = {
      comments: driver.comments
    };
    switch (this.status) {
      case 'rejected':
        model.isRejected = true;
        break;
      case 'suspended':
        model.isSuspended = true;
        break;
      default:
        model.status = this.status;
    }

    this.updateDriverAccount(driver.id, model);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
