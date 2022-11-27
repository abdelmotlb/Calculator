import { TestBed } from '@angular/core/testing';

import { LinkappService } from './linkapp.service';

describe('LinkappService', () => {
  let service: LinkappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
