import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPrivateComponent } from './member.component';

describe('MemberPrivateComponent', () => {
  let component: MemberPrivateComponent;
  let fixture: ComponentFixture<MemberPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
