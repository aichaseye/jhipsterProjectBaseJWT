import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NomCFPDetailComponent } from './nom-cfp-detail.component';

describe('NomCFP Management Detail Component', () => {
  let comp: NomCFPDetailComponent;
  let fixture: ComponentFixture<NomCFPDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NomCFPDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nomCFP: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NomCFPDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NomCFPDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nomCFP on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nomCFP).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
