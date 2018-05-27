import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SabreLoadComponent } from './sabre-load.component';

describe('SabreLoadComponent', () => {
  let component: SabreLoadComponent;
  let fixture: ComponentFixture<SabreLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SabreLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SabreLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
