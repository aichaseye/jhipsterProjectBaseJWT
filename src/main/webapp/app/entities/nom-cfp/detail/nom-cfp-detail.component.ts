import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INomCFP } from '../nom-cfp.model';

@Component({
  selector: 'jhi-nom-cfp-detail',
  templateUrl: './nom-cfp-detail.component.html',
})
export class NomCFPDetailComponent implements OnInit {
  nomCFP: INomCFP | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nomCFP }) => {
      this.nomCFP = nomCFP;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
