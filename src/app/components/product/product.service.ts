import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readyById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  confirmDeletion(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.delete(product.id);
      }
    });
  }

  delete(id: number): void{
    const url = `${this.baseUrl}/${id}`;
    console.log("excluinddo produto")
    this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    ).subscribe(() => {
      this.showMessage('Produto excluído com sucesso!');
    });
  }
}
