import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDirectoryComponent } from './shared-directory.component';

describe('SharedDirectoryComponent', () => {
  let component: SharedDirectoryComponent;
  let fixture: ComponentFixture<SharedDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
