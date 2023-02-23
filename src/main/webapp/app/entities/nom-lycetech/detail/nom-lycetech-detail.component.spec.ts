import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NomLycetechDetailComponent } from './nom-lycetech-detail.component';

describe('NomLycetech Management Detail Component', () => {
  let comp: NomLycetechDetailComponent;
  let fixture: ComponentFixture<NomLycetechDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NomLycetechDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nomLycetech: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NomLycetechDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NomLycetechDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nomLycetech on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nomLycetech).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
