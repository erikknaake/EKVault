import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from "../settings.service";
import {FormControl, Validators} from "@angular/forms";
import {noDoubleCharacters, noJSON} from "../../shared/validators/alphabet-validators";
import {ISlideToggleEvent} from "./ISlideToggleEvent";
import {ISubscriber} from "../../shared/ISubscriber";

@Component({
  selector: 'app-change-alphabet',
  templateUrl: './change-alphabet.component.html',
  styleUrls: ['./change-alphabet.component.scss']
})
export class ChangeAlphabetComponent implements OnInit, OnDestroy {

  public static readonly MIN_ALPHABET_LENGTH = 20;
  public static readonly MAX_ALPHABET_LENGTH = 256; // After 256 Nanoid (CSPRNG) becomes insecure

  private _containsAllCapitals: boolean = false;
  private _containsAllLetters: boolean = false;
  private _containsAllNumbers: boolean = false;
  private _containsAllSymbols: boolean = false;

  private alphabetSubscription: ISubscriber<string>;

  public alphabetControl = new FormControl('', [
    Validators.required,
    Validators.max(ChangeAlphabetComponent.MAX_ALPHABET_LENGTH),
    Validators.min(ChangeAlphabetComponent.MIN_ALPHABET_LENGTH),
    noJSON(),
    noDoubleCharacters()
  ]);

  constructor(private readonly settings: SettingsService) {
  }

  ngOnInit() {
    this.alphabetControl.valueChanges.subscribe((value: string) => {
      this.settings.alphabetValue = value;
      // the alphabetObserverableValue makes sure this doesnt loop
      this.adjustSliders();
    });
    this.alphabetSubscription = this.settings.alphabet.subscribe((value: string) => {
      this.alphabetControl.setValue(this.settings.alphabet.value);
    });
    this.alphabetControl.setValue(this.settings.alphabet.value);
  }

  ngOnDestroy(): void {
    if(this.alphabetSubscription != null)
      this.settings.alphabet.unsubscribe(this.alphabetSubscription);
  }

  private adjustSliders() {
    this._containsAllCapitals = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet.value, SettingsService.CAPITALS);
    this._containsAllLetters = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet.value, SettingsService.LETTERS);
    this._containsAllNumbers = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet.value, SettingsService.NUMBERS);
    this._containsAllSymbols = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet.value, SettingsService.SYMBOLS);
  }

  private static stringCharactersInString(str: string, part: string): boolean {
    let charactersFound: string = '';
    for(let i: number = 0; i < part.length; i++) {
      for(let j: number = 0; j < str.length; j++) {
        if(part[i] === str[j]) {
          charactersFound += part[i];
        }
      }
    }
    return charactersFound === part;
  }

  public getAlphabetError(): string {
    if(this.alphabetControl.hasError('noJSON')) {
      return 'An alphabet connot contain a , nor a :';
    } else if(this.alphabetControl.hasError('noDoubleCharacters')) {
      return 'An alphabet cannot contain the same character more than once';
    } else if(this.alphabetControl.hasError('min')) {
      return `An alphabet must be at least ${ChangeAlphabetComponent.MIN_ALPHABET_LENGTH} characters long`;
    } else if(this.alphabetControl.hasError('max')) {
      return `An alphabet can at most be ${ChangeAlphabetComponent.MAX_ALPHABET_LENGTH} characters long`;
    } else if(this.alphabetControl.hasError('required')) {
      return 'There must be an alphabet to generate passwords';
    }
  }

  public updateCapitals(event: ISlideToggleEvent): void {
    this.findAndRemoveOrAdd(event.checked, SettingsService.CAPITALS);
  }

  public updateLetters(event: ISlideToggleEvent): void {
    this.findAndRemoveOrAdd(event.checked, SettingsService.LETTERS);
  }

  public updateNumbers(event: ISlideToggleEvent): void {
    this.findAndRemoveOrAdd(event.checked, SettingsService.NUMBERS);
  }

  public updateSymbols(event: ISlideToggleEvent): void {
    this.findAndRemoveOrAddSymbols(event.checked, SettingsService.SYMBOLS);
  }

  private findAndRemoveOrAdd(add: boolean, set: string): void {
    this.settings.alphabetValue = this.settings.alphabet.value.replace(new RegExp(`(${set})`), '');
    if (add)
        this.settings.alphabet.value += set;
    this.alphabetControl.setValue(this.settings.alphabet.value);
  }

  // Since regex and special characters are hard to mix this more inefficient way should only be used to filter out special characters
  private findAndRemoveOrAddSymbols(add: boolean, symbols: string) {
    for(let i: number = 0; i < symbols.length; i++) {
      for(let j: number = 0; j < this.settings.alphabet.value.length; j++) {
        if(symbols[i] === this.settings.alphabet.value[j]) {
          this.settings.alphabetValue = ChangeAlphabetComponent.removeCharacter(this.settings.alphabet.value, j);
        }
      }
    }
    if(add)
      this.settings.alphabet.value += symbols;
    this.alphabetControl.setValue(this.settings.alphabet.value);
  }

  private static removeCharacter(str: string, index: number): string {
    return (str.substring(0, index) + str.substring(index + 1, str.length));
  }

  get containsAllCapitals(): boolean {
    return this._containsAllCapitals;
  }

  get containsAllLetters(): boolean {
    return this._containsAllLetters;
  }

  get containsAllNumbers(): boolean {
    return this._containsAllNumbers;
  }

  get containsAllSymbols(): boolean {
    return this._containsAllSymbols;
  }

}
