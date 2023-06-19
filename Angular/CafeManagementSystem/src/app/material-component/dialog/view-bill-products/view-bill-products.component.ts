import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss']
})
export class ViewBillProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total'];

  dataSource: any;

  data: any;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ViewBillProductsComponent>
    ) { }

  ngOnInit() {
    //console.log(this.dataSource,"1")
    //console.log(this.data,"2")
    this.data = this.dialogData.data;
    console.log(this.data,"2")
    //this.dataSource = this.data.productDetails;
    const parsedData = JSON.parse(this.dialogData.data.productDetails);
    this.dataSource = parsedData;
    // console.log(this.dialogData.data);
     console.log(this.dataSource,"1")
     console.log(this.data.productDetails)
    // console.log(this.data,"2")
  }
  
}
