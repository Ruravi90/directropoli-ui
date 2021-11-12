import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDirectoryComponent } from './form-directory.component';

describe('RegisterDirectoryComponent', () => {
  let component: FormDirectoryComponent;
  let fixture: ComponentFixture<FormDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
