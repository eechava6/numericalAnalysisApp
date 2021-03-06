import { Component, OnInit } from '@angular/core';
import {ServiceDataService} from '../service-data.service'

declare const showFunction:any;

@Component({
  selector: 'app-incremental-search',
  templateUrl: './incremental-search.component.html',
  styleUrls: ['./incremental-search.component.scss']
})
export class IncrementalSearchComponent implements OnInit {

  public method = {
    start : 0,
    step : 0,
    end : 0,
    f : ""
  }
  public errors = "";
  public results : [];
  public functions = ["x"];


  constructor(public request : ServiceDataService)
  {}

  ngOnInit(): void {
    showFunction(this.functions);
    this.method.f = localStorage.getItem('f');
  }

  iters(){
    if(this.method.end < this.method.start) this.errors = "Start must be > End"
    else this.errors = ""
  }

  step(){
    if(this.method.step <= 0) this.errors = "Step must be > 0"
    else this.errors = ""
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
    this.request.getJson("incSearch", {start: Number(this.method.start), step: Number(this.method.step), end: Number(this.method.end), f: this.method.f}).subscribe((res: any) => {
      if(res.error){
        this.errors = res.source;
        this.results = null;
        setTimeout(_=>{
          this.errors = ""
        },2000)
      }else{
        this.errors = "";
        this.results = res.method.iters;
      }
    });

  }

}
