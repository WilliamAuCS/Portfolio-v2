import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasmophobiaComponent } from './phasmophobia.component';

describe('PhasmophobiaComponent', () => {
  let component: PhasmophobiaComponent;
  let fixture: ComponentFixture<PhasmophobiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasmophobiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasmophobiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
