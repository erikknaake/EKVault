import { TestBed } from '@angular/core/testing';

import { EncrypterService } from './encrypter.service';

describe('EncrypterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncrypterService = TestBed.get(EncrypterService);
    expect(service).toBeTruthy();
  });

  it('should encrypt', () => {
    const data = 'Hello World';
    const key = 'AbC';
    const encrypted = EncrypterService.encrypt(data, key);
    expect(encrypted).not.toEqual(data);
  });

  it('should decrypt', () => {
    const data = 'Hello World';
    const key = 'AbC';
    const encrypted = EncrypterService.encrypt(data, key);
    const decrypted = EncrypterService.decrypt(encrypted, key);
    expect(decrypted).toEqual(data);
  });
});
