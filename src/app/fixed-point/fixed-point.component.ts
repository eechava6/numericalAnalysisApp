import { Component, OnInit } from '@angular/core';
import {ServiceDataService} from '../service-data.service'

declare const showFunction:any;

@Component({
  selector: 'app-fixed-point',
  templateUrl: './fixed-point.component.html',
  styleUrls: ['./fixed-point.component.scss']
})
export class FixedPointComponent implements OnInit {

  public method = {
    a : 0,
    tol : 0,
    iters : 0,
    f : "" ,
    g : ""
  }


  public errors = "";
  public results : [];
  public functions = ["x"];

  constructor(public request : ServiceDataService) { 
    
  }

  ngOnInit(): void {
    showFunction(this.functions);
    this.method.f = localStorage.getItem('f');
    this.method.g = localStorage.getItem('g');
  }

  onKeyFunction(event: any){
    try{
      this.functions[0] = this.method.f;
      showFunction(this.functions);
      this.errors = "";
    }catch{
      this.errors = "unrecognized function";
      showFunction("x");
    }
    
  }
  getResults(){
    localStorage.setItem('f',this.functions[0]);
    localStorage.setItem('g',this.functions[1]);
    this.request.getJson("fixedPoint", {a: Number(this.method.a), tol: Number(this.method.tol), iters: Number(this.method.iters), f: this.method.f, g: this.method.g}).subscribe((res: any) => {
      if(res.error){
        this.errors = res.source;
      }else{
        this.errors = "";
        this.results = res.method.iters;
        console.log(res.error)
      }
    });
}
}
