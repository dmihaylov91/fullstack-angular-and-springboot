import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CskaTeamComponent } from './cska-team.component';

describe('CskaTeamComponent', () => {
  let component: CskaTeamComponent;
  let fixture: ComponentFixture<CskaTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CskaTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CskaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
