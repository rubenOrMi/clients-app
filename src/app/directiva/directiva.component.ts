import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [],
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  languages: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'PHP', 'C#'];
  showData: boolean = true;

}
