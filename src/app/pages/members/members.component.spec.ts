import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPrivateComponent } from './members.component';

describe('MemberPrivateComponent', () => {
  let component: MembersPrivateComponent;
  let fixture: ComponentFixture<MembersPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersPrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
