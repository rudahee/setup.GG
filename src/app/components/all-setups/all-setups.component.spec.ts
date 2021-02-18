import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSetupsComponent } from './all-setups.component';

describe('AllSetupsComponent', () => {
  let component: AllSetupsComponent;
  let fixture: ComponentFixture<AllSetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSetupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
