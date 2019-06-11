import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavExtensionsComponent } from './fav-extensions.component';

describe('FavExtensionsComponent', () => {
  let component: FavExtensionsComponent;
  let fixture: ComponentFixture<FavExtensionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavExtensionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
