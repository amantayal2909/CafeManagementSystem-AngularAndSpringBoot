import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatSnackBar } from '@angular/material/snack-bar';
//import * as Razorpay from 'razorpay';
//import * as Razorpay from 'razorpay';
declare var Razorpay: any;
@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];

  //dataSource: any = [];
  dataSource: any[] = [];


  // manageOrderForm:  FormGroup;
  manageOrderForm:any= FormGroup ; 

  categories: any = [];

  products: any = [];

  price: any;

  productname: String | undefined
  totalAmount: number = 0;

  responseMessage: any;
  
  flags: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private billService: BillService,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    // this.getCategories();
    this.manageOrderForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]],
    })
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getFilteredCategories().subscribe((response: any) => {
      // console.log(response, "New");
      this.ngxService.stop();
      this.categories = response;
      console.log(this.categories,"this one ");
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  getProductsByCategory(value: any) {
    // console.log(value, "Category Value")
    this.productService.getProductsByCategory(value.target.value).subscribe((response: any) => {
      this.products = response;
      // console.log(this.products)
      this.manageOrderForm.controls['price'].setValue('');
      this.manageOrderForm.controls['quantity'].setValue('');
      this.manageOrderForm.controls['total'].setValue(0);
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  

  getProductDetails(value: any) {
    if(value.target.value == -1) return;
    this.productService.getById(value.target.value).subscribe((response: any) => {
      this.price = response.price;
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue('1');
      console.log(response.name)
      this.productname=response.name
      this.manageOrderForm.controls['total'].setValue(this.price * 1);
      console.log(response);
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  
  setQuantity(value: any) {
    var temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    } else if(temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }

  // validateProductAdd() {
  //   if(this.manageOrderForm.controls['total'].value === 0 || this.manageOrderForm.controls['total'].value === null || this.manageOrderForm.controls['quantity'].value <= 0) {
  //     return true;
  //   } else return false;
  // }
  validateProductAdd(): boolean {
    const totalValue = this.manageOrderForm.controls['total'].value;
    const quantityValue = this.manageOrderForm.controls['quantity'].value;
  
    return totalValue === 0 || totalValue === null || quantityValue <= 0;
  }
  

  validateSubmit() {
    if(this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null || this.manageOrderForm.controls['email'].value === null || 
    this.manageOrderForm.controls['contactNumber'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null){
      return true;
    } else return false;
  }

  // add() {
  //   var formData = this.manageOrderForm.value;
  //   var productName = this.dataSource.find((e: { id: number }) => e.id === formData.product.id);
  //   if(productName === undefined) {
  //     this.totalAmount = this.totalAmount + formData.total;
  //     this.dataSource.push({
  //       id:formData.product.id,
  //       name: formData.product.name,
  //       category: formData.category.name,
  //       quantity: formData.quantity,
  //       price: formData.price,
  //       total: formData.total
  //     });
  //     this.dataSource = [...this.dataSource];
  //     this.snackbarService.openSnackBar(GlobalConstants.productAdded, "success");
  //   } else {
  //     this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
  //   }
  // }

  add() {
    const formData = this.manageOrderForm.value;
    const productId = formData.product;
  
    const duplicateProduct = this.dataSource.find((item: { id: number }) => item.id === productId);
  
    if (!duplicateProduct) {
      const total = formData.quantity * formData.price;
      this.totalAmount += total;
  
      this.dataSource.push({
        id: productId,
       // name: formData.product.name,
        name:this.productname,
        category: formData.category,
        quantity: formData.quantity,
        price: formData.price,
        total: total
      });
      this.dataSource = [...this.dataSource];
      //this.manageOrderForm.reset(); // Reset the form after successful addition
  
      this.snackbarService.openSnackBar(GlobalConstants.productAdded, 'success');
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }
  
  // add() {
  //   const formData = this.manageOrderForm.value;
  //   const productId = formData.product.id;
  //   console.log(this.manageOrderForm)
  //   const existingProductIndex = this.dataSource.findIndex((item: { id: number }) => item.id === productId);
  
  //   if (existingProductIndex === -1) {
  //     const total = formData.quantity * formData.price;
  //     this.totalAmount += total;
  
  //     const newProduct = {
  //       id: productId,
  //       name: this.productname,
  //       category: formData.category,
  //       quantity: formData.quantity,
  //       price: formData.price,
  //       total: total
  //     };
  //     console.log(newProduct)
  
  //     this.dataSource = [...this.dataSource, newProduct]; // Assign a new reference to the dataSource array
  
  //     //this.manageOrderForm.reset(); // Reset the form after successful addition
  //     this.snackbar.open('Product added successfully', 'Dismiss', {
  //       duration: 1000, // Adjust the duration as needed (in milliseconds)
  //       panelClass: ['success-snackbar'] // Apply custom CSS class for the snackbar styling
  //     });
  
  //     //this.snackbarService.openSnackBar(GlobalConstants.productAdded, 'success');
  //    // alert('added success');
      
  //   } else {
  //     this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
  //   }
  // }
  
  
  
  
  

  handleDeleteAction(value: any, element: any) {
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    if(this.flags==true){
    var formData = this.manageOrderForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount.toString(),
      productDetails: JSON.stringify(this.dataSource)
    }
    this.ngxService.start();
    this.billService.generateReport(data).subscribe((response: any) => {
      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
      this.flags=false;
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })

    //this.flags=false;
  }
}

  downloadFile(fileName: string) {
    var data = {
      uuid: fileName
    }

    this.billService.getPdf(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
      this.ngxService.stop();
    })
  }

  createTransaction() {
   // let amount = this.getCalculatedGrandTotal();
   if(this.flags==false){

    this.billService.createTransaction(this.totalAmount).subscribe(
      (response) => {
        console.log(response);
        this.openTransactioModal(response);
        //this.flags=true;
      
      },
      (error) => {
        console.log(error);
      }
    );
    //this.flags=true;
   }

  }

  openTransactioModal(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      //name: 'Learn programming yourself',
      //description: 'Payment of online shopping',
      //image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response);
          this.flags=true;
        } else {
          alert("Payment failed..")
        }
       
      },
      prefill : {
        name:'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '90909090'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
    console.log(this.flags)

  }

  processResponse(resp: any) {
    //this.orderDetails.transactionId = resp.razorpay_payment_id;
    //this.placeOrder(orderForm);
  }

}