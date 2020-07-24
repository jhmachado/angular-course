import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { empty } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null){
      this.retrieveProduct(id);
    } else {
      this.createEmptyProduct();
    }
  }

  createEmptyProduct(): void {
    this.product = {
      name: "",
      price: 0
    }
  }

  retrieveProduct(id: string): void {
    this.productService.readyById(id).subscribe(product => {
      this.product = product;
    });
  }

  save(): void {
    if (this.product.id != undefined) {
      this.createProduct()
    } else {
      this.updateProduct()
    }
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
  }
  
  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
