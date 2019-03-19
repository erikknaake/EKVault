import {TestBed} from "@angular/core/testing";
import {NavigationComponent} from "./navigation.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('NavigationComponent', () => {

  let component;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationComponent
      ],
      imports: [
        RouterTestingModule
      ]
    });
    component = TestBed.get(NavigationComponent);
  });

  it('should init', () => {
    expect(component).toBeTruthy();
  })
});
