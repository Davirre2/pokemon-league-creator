import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymTeamsComponent } from './gym-teams.component';

describe('GymTeamsComponent', () => {
  let component: GymTeamsComponent;
  let fixture: ComponentFixture<GymTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
