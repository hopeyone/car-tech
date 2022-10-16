import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ToDontDetailComponent } from './to-dont-detail.component';

describe('ToDont Management Detail Component', () => {
  let comp: ToDontDetailComponent;
  let fixture: ComponentFixture<ToDontDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDontDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ toDont: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ToDontDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ToDontDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load toDont on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.toDont).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
