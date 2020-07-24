import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.component.html',
})
export class ProductDialogComponent implements OnInit {

  product: Product;
  
  constructor(
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit() {
    this.product = this.data;
  }

  confirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
