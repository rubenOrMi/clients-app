import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'paginator-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges{
  
  @Input() public paginator: any;
  @Input() public url: string;
  public paginas: number[];
  
  private from: number;
  private to: number;
  
  ngOnInit() {
    this.initPaginator();
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    let paginatorUpdated = changes['paginator'];
    if(paginatorUpdated.previousValue){
      this.initPaginator();
    }
  }
  
  private initPaginator(): void {
    this.from = Math.min(Math.max(1, this.paginator.number-4), this.paginator.totalPages-5);
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number+4), 6);
    if(this.paginator.totalPages > 5){
      this.paginas = new Array(this.to -this.from +1).fill(0).map((value, index) => {
        return index + this.from;
      });
    }else{
      this.paginas = new Array(this.paginator.totalPages).fill(0).map((value, index) => {
        return index + 1;
      });
    }

  }
}
