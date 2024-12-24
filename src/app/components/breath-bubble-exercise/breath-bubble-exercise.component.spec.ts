import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathBubbleExerciseComponent } from './breath-bubble-exercise.component';

describe('BreathBubbleExerciseComponent', () => {
  let component: BreathBubbleExerciseComponent;
  let fixture: ComponentFixture<BreathBubbleExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreathBubbleExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreathBubbleExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
