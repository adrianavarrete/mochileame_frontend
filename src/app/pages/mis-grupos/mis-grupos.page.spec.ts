import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisGruposPage } from './mis-grupos.page';

describe('MisGruposPage', () => {
  let component: MisGruposPage;
  let fixture: ComponentFixture<MisGruposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisGruposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisGruposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
