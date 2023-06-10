import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  patients: any[] = [];

  constructor(private router: Router, private http: HttpClient, private storage: StorageService) {}

  ngOnInit() {
    this.fetchPatients();
  }

  redirectPaciente(patient: any){
    console.log("paciente: "+patient.DNI)
    this.storage.set("paciente", patient).then(() => {
      this.router.navigate(["/paciente/" + patient.DNI]);
    });
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
