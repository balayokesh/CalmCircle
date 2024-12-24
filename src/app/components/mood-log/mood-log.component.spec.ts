import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodLogComponent } from './mood-log.component';

describe('MoodLogComponent', () => {
  let component: MoodLogComponent;
  let fixture: ComponentFixture<MoodLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
