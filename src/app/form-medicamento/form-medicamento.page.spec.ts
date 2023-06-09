import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMedicamentoPage } from './form-medicamento.page';

describe('FormMedicamentoPage', () => {
  let component: FormMedicamentoPage;
  let fixture: ComponentFixture<FormMedicamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
