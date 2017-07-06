/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GifsService } from './gifs.service';

describe('GifsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GifsService]
    });
  });

  it('should ...', inject([GifsService], (service: GifsService) => {
    expect(service).toBeTruthy();
  }));
});
