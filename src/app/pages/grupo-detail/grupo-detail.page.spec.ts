import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoDetailPage } from './grupo-detail.page';

describe('GrupoDetailPage', () => {
  let component: GrupoDetailPage;
  let fixture: ComponentFixture<GrupoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
