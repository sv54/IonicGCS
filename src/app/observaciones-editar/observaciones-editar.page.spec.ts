import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservacionesEditarPage } from './observaciones-editar.page';

describe('ObservacionesEditarPage', () => {
  let component: ObservacionesEditarPage;
  let fixture: ComponentFixture<ObservacionesEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObservacionesEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
