import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailsPanelComponent } from './admin-details-panel.component';

describe('AdminDetailsPanelComponent', () => {
  let component: AdminDetailsPanelComponent;
  let fixture: ComponentFixture<AdminDetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDetailsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
