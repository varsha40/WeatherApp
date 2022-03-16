import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraWeatherInfoComponent } from './extra-weather-info.component';

describe('ExtraWeatherInfoComponent', () => {
  let component: ExtraWeatherInfoComponent;
  let fixture: ComponentFixture<ExtraWeatherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraWeatherInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraWeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
