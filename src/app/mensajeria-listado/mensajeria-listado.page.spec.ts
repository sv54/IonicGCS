import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensajeriaListadoPage } from './mensajeria-listado.page';

describe('MensajeriaListadoPage', () => {
  let component: MensajeriaListadoPage;
  let fixture: ComponentFixture<MensajeriaListadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MensajeriaListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
