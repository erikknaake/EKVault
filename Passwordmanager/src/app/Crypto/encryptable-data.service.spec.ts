import { TestBed } from '@angular/core/testing';

import { EncryptableDataService } from './encryptable-data.service';
import {CSPRNGService} from "./csprng.service";

describe('EncryptableDataService', () => {
  let service: EncryptableDataService;
  let csprngSpy;
  beforeEach(() => {
    csprngSpy = spyOn(CSPRNGService, 'generateCSPRN');
    csprngSpy.and.callFake((length: number) => {
      return 'b'.repeat(length);
    });
    TestBed.configureTestingModule({
      providers: [
        EncryptableDataService
      ]
    });

    service = TestBed.get(EncryptableDataService);
  });

  it('should update padding when data changes', () => {
    let paddingSpy = spyOn<any>(service, 'updatePadding');
    paddingSpy.and.callThrough();
    service.data = 'ab';
    expect(paddingSpy).toHaveBeenCalledTimes(1);
    expect(service.data).toEqual('ab');
    expect(service.paddingSize).toEqual(253);
  });

  it('should not have a padding more then 255 long', () => {
    service.data = ('a'.repeat(256));
    expect(service.paddingSize).toEqual(254);
  });

  it('should prepend 0 when a number is too short', () => {
    expect(service['makeNumberFixedLengthString'](2, 3)).toEqual('002');
  });

  it('should not prepend 0 when a number is the right size', () => {
    expect(service['makeNumberFixedLengthString'](500, 3)).toEqual('500');
  });

  it('Should encrypt itself', () => {
    service.data = 'Hello World';
    const encrypted = service.encrypt('abc');
    expect(encrypted.substr(0, 3)).toEqual('244');
    expect(encrypted).not.toEqual('Hello World');
  });

  it('Should restore itself from encrypted string', () => {
    service.data = 'Hello World';
    const encrypted = service.encrypt('abc');
    const decrypted = EncryptableDataService.fromString(encrypted, 'abc');
    expect(decrypted.data).toEqual('Hello World');
  });

  it('Should restore itself from encrypted string with default data', () => {
    const encrypted = service.encrypt('abc');
    const decrypted = EncryptableDataService.fromString(encrypted, 'abc');
    expect(decrypted.data).toEqual('[]');
  });

});
