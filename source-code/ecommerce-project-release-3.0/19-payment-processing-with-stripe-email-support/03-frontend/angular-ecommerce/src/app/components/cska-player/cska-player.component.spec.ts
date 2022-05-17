import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CskaPlayerComponent } from './cska-player.component';

describe('CskaPlayerComponent', () => {
  let component: CskaPlayerComponent;
  let fixture: ComponentFixture<CskaPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CskaPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CskaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
