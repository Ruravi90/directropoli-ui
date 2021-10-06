import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDirectoryComponent } from './register-directory.component';

describe('RegisterDirectoryComponent', () => {
  let component: RegisterDirectoryComponent;
  let fixture: ComponentFixture<RegisterDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
