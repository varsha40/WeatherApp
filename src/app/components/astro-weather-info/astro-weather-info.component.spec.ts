import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroWeatherInfoComponent } from './astro-weather-info.component';

describe('AstroWeatherInfoComponent', () => {
  let component: AstroWeatherInfoComponent;
  let fixture: ComponentFixture<AstroWeatherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroWeatherInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstroWeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
