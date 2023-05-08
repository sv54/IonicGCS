import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  patients = [
    { name: 'John Doe', id: '123', image: 'path/to/image' },
    { name: 'Jane Smith', id: '456', image: 'path/to/image' },
    { name: 'Bob Johnson', id: '789', image: 'path/to/image' }
  ];
}
