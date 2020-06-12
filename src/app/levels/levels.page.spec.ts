import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LevelsPage } from './levels.page';

describe('LevelsPage', () => {
  let component: LevelsPage;
  let fixture: ComponentFixture<LevelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelsPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
