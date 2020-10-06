import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<DocumentsComponent>,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  download() {
    this.isLoading = true;
    const query = {
      id: this.data.id,
      type: this.data.type
    };
    this.vehicleService.download(query).subscribe(data => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = 'doc';
      document.body.appendChild(a);
      a.click();
      this.isLoading = false;
    });
  }
}
