import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreartemaPage } from './creartema.page';

describe('CreartemaPage', () => {
  let component: CreartemaPage;
  let fixture: ComponentFixture<CreartemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreartemaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreartemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
