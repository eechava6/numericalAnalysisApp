import { Component, OnInit } from '@angular/core';
import {ServiceDataService} from "../service-data.service";

declare const showFunction:any;

@Component({
  selector: 'app-multiple-roots',
  templateUrl: './multiple-roots.component.html',
  styleUrls: ['./multiple-roots.component.scss']
})
export class MultipleRootsComponent implements OnInit {

  public method = {
    a : 0,
    tol : 0,
    iters : 0,
    f : "",
    df : "",
    ddf : ""
  }
  public errors = "";
  public results : [];
  public functions = ["x"];

  constructor(public request : ServiceDataService) {

  }

  ngOnInit(): void {
    this.method.f = localStorage.getItem('f');
    this.functions[0] = this.method.f;
    this.method.df = localStorage.getItem('df');
    this.functions[1] = this.method.df;
    this.method.ddf = localStorage.getItem('ddf');
    this.functions[2] = this.method.ddf;
    showFunction(this.functions);
    
  }

  onKeyFunctionF(event: any){
    try{
      this.functions[0] = this.method.f;
      showFunction(this.functions);
      this.errors = "";
    }catch{
      this.errors = "unrecognized function";
      showFunction("x");
    }
  }

  onKeyFunctiondF(event: any){
    try{
      this.functions[1] = this.method.df;
      showFunction(this.functions);
      this.errors = "";
    }catch{
      this.errors = "unrecognized function";
      showFunction("x");
    }
  }
  tol(){
    if(this.method.tol < 0) this.errors = "Tolerance must be positive"
    else this.errors = ""
  }

  iters(){
    if(this.method.iters < 1) this.errors = "Iters must be > 0"
    else this.errors = ""
  }
  onKeyFunctionddF(event: any){
    try{
      this.functions[2] = this.method.ddf;
      showFunction(this.functions);
      this.errors = "";
    }catch{
      this.errors = "unrecognized function";
      showFunction("x");
    }
  }

  getResults(){
    localStorage.setItem('f',this.functions[0]);
    localStorage.setItem('df',this.functions[1]);
    localStorage.setItem('ddf',this.functions[2]);
    this.request.getJson("multipleRoots", {
      a: Number(this.method.a),
      tol: Number(this.method.tol),
      iters: Number(this.method.iters),
      f: this.method.f,
      df: this.method.df,
      ddf: this.method.ddf
    }).subscribe((res: any) => {
      if(res.error){
        this.errors = res.source;
        this.results = null;
        if(res.method.iters){
          this.results = res.method.iters;
        }
        setTimeout(_=>{
          this.errors = ""
        },6000)
      }else{
        this.errors = "";
        this.results = res.method.iters;
        console.log(res.error)
      }
    });

  }
}
