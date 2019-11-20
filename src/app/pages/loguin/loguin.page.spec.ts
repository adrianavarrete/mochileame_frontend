import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoguinPage } from './loguin.page';

describe('LoguinPage', () => {
  let component: LoguinPage;
  let fixture: ComponentFixture<LoguinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoguinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoguinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
