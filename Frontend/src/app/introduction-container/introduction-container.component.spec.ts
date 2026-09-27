import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionContainerComponent } from './introduction-container.component';

describe('IntroductionContainerComponent', () => {
  let component: IntroductionContainerComponent;
  let fixture: ComponentFixture<IntroductionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroductionContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
