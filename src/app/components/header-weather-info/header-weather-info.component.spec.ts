import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWeatherInfoComponent } from './header-weather-info.component';

describe('HeaderWeatherInfoComponent', () => {
  let component: HeaderWeatherInfoComponent;
  let fixture: ComponentFixture<HeaderWeatherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderWeatherInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderWeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
