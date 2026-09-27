import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLookingComponent } from './people-looking.component';

describe('PeopleLookingComponent', () => {
  let component: PeopleLookingComponent;
  let fixture: ComponentFixture<PeopleLookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleLookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleLookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
