import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPacientePagePage } from './agregar-paciente-page.page';

describe('AgregarPacientePagePage', () => {
  let component: AgregarPacientePagePage;
  let fixture: ComponentFixture<AgregarPacientePagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarPacientePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
