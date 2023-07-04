import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products:Array<Product> =[];
  public keyword:string="";
  constructor(private ps:ProductService) {

  }
  handleCheckProduct(product:Product){
    this.ps.checkProduct(product).subscribe(
      {
        next:updatedProduct=>{

           product.checked = !product.checked;

        }
      }
    )

  }
  handleDeleteProduct(product:Product){
    if(confirm("Etes-vous sure?")){
      this.ps.deleteProduct(product).subscribe(
        {
          next:value=>{
            this.products=this.products.filter(p=>p.id!=product.id)
          }
        }
      )
    }


  }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
   this.ps.getProducts(1,5).subscribe(
     {
       next:data=>{
         this.products=data;
       },
       error:err => {
        console.log(err);
       }
     }
   )
  }

  searchProducts() {
    this.ps.searchProducts(this.keyword).subscribe(
      {
        next:data=>{
          this.products=data;
        }
      }
    )
  }
}
