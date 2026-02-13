import { TestBed } from '@angular/core/testing';

import { Pet } from '../models/pet.model';

describe('Pet', () => {
  let service: Pet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
