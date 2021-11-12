import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPrivateComponent } from './index.component';

describe('DashboardComponent', () => {
  let component: IndexPrivateComponent;
  let fixture: ComponentFixture<IndexPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
