import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IToDont } from '../to-dont.model';

@Component({
  selector: 'jhi-to-dont-detail',
  templateUrl: './to-dont-detail.component.html',
})
export class ToDontDetailComponent implements OnInit {
  toDont: IToDont | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ toDont }) => {
      this.toDont = toDont;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
