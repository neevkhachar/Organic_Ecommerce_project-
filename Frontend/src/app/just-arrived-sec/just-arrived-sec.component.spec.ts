import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustArrivedSecComponent } from './just-arrived-sec.component';

describe('JustArrivedSecComponent', () => {
  let component: JustArrivedSecComponent;
  let fixture: ComponentFixture<JustArrivedSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustArrivedSecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustArrivedSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
