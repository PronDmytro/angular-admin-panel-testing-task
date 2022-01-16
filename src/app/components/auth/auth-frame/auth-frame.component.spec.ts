import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFrameComponent } from './auth-frame.component';

describe('AuthFrameComponent', () => {
  let component: AuthFrameComponent;
  let fixture: ComponentFixture<AuthFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFrameComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
