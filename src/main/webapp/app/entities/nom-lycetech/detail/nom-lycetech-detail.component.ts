import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INomLycetech } from '../nom-lycetech.model';

@Component({
  selector: 'jhi-nom-lycetech-detail',
  templateUrl: './nom-lycetech-detail.component.html',
})
export class NomLycetechDetailComponent implements OnInit {
  nomLycetech: INomLycetech | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nomLycetech }) => {
      this.nomLycetech = nomLycetech;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
