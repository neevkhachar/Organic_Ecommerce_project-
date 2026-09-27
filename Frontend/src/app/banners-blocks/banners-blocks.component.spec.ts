import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersBlocksComponent } from './banners-blocks.component';

describe('BannersBlocksComponent', () => {
  let component: BannersBlocksComponent;
  let fixture: ComponentFixture<BannersBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannersBlocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannersBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
