import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneioComponent } from './torneio.component';

describe('TorneioComponent', () => {
  let component: TorneioComponent;
  let fixture: ComponentFixture<TorneioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
