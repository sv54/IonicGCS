import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationPagePage } from './configuration-page.page';

describe('ConfigurationPagePage', () => {
  let component: ConfigurationPagePage;
  let fixture: ComponentFixture<ConfigurationPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfigurationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
