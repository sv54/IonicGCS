import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page{
  patients: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPatients();
  }

  fetchPatients() {
    console.log("fetching");
    this.http.get<any[]>('http://localhost:3000/pacientes')
      .subscribe(
        data => {
          this.patients = data;
          console.log('Patients:', this.patients);
        },
        error => {
          console.error('Failed to fetch patients:', error);
        }
      );
  } 
}
