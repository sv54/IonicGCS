import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteHistorialPage } from './paciente-historial.page';

describe('PacienteHistorialPage', () => {
  let component: PacienteHistorialPage;
  let fixture: ComponentFixture<PacienteHistorialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PacienteHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
