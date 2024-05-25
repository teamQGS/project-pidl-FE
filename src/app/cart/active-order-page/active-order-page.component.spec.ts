import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOrderPageComponent } from './active-order-page.component';

describe('ActiveOrderPageComponent', () => {
  let component: ActiveOrderPageComponent;
  let fixture: ComponentFixture<ActiveOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveOrderPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
