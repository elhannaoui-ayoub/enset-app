import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products:Array<Product> =[];
  public keyword:string="";
  totalPages:number=0;
  pageSize=3;

  currentPage:number=1;
  constructor(private ps:ProductService,private router:Router) {

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
    this.searchProducts();
  }
  searchProducts(){
   this.ps.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe(
     {
       next:(resp)=>{
         this.products=resp.body as Product[];
         let totalProducts:number =parseInt(resp.headers.get('x-total-count')!);
         console.log(totalProducts);
         this.totalPages=Math.floor(totalProducts/this.pageSize);

         if(totalProducts % this.pageSize!=0){
          this.totalPages++;
         }
         console.log(this.totalPages);
       },
       error:err => {
        console.log(err);
       }
     }
   )
  }

  /*searchProducts() {
    this.currentPage=1;
    this.totalPages=0;
    this.ps.getProducts(this.keyword,this.currentPage,this.pageSize).subscribe(
      {
        next:data=>{
          this.products=data;
        }
      }
    )
  }*/
  handleGoToPage(page:number){
  this.currentPage=page;
  this.searchProducts()
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
