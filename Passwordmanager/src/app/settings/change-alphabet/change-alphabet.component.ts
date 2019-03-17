import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../settings.service";
import {FormControl, Validators} from "@angular/forms";
import {noDoubleCharacters, noJSON} from "../../shared/validators/alphabet-validators";
import {ISlideToggleEvent} from "./ISlideToggleEvent";

@Component({
  selector: 'app-change-alphabet',
  templateUrl: './change-alphabet.component.html',
  styleUrls: ['./change-alphabet.component.scss']
})
export class ChangeAlphabetComponent implements OnInit {

  public static readonly MIN_ALPHABET_LENGTH = 20;
  public static readonly MAX_ALPHABET_LENGTH = 256; // After 256 Naniod becomes insecure
  private containsAllCapitals: boolean = false;
  private containsAllLetters: boolean = false;
  private containsAllNumbers: boolean = false;
  private containsAllSymbols: boolean = false;

  public alphabetControl = new FormControl('', [
    Validators.required,
    Validators.max(ChangeAlphabetComponent.MAX_ALPHABET_LENGTH),
    Validators.min(ChangeAlphabetComponent.MIN_ALPHABET_LENGTH),
    noJSON(),
    noDoubleCharacters()
  ]);

  constructor(private readonly settings: SettingsService) { }

  ngOnInit() {
    this.alphabetControl.valueChanges.subscribe((value: string) => {
      this.settings.alphabet = value;
      this.adjustSliders();
    });
    this.alphabetControl.setValue(this.settings.alphabet);
  }

  private adjustSliders() {
    this.containsAllCapitals = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet, SettingsService.CAPITALS);
    this.containsAllLetters = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet, SettingsService.LETTERS);
    this.containsAllNumbers = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet, SettingsService.NUMBERS);
    this.containsAllSymbols = ChangeAlphabetComponent.stringCharactersInString(this.settings.alphabet, SettingsService.SYMBOLS);
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
    this.settings.alphabet = this.settings.alphabet.replace(new RegExp(`(${set})`), '');
    if (add)
        this.settings.alphabet += set;
    this.alphabetControl.setValue(this.settings.alphabet);
  }

  // Since regex and special characters are hard to mix this more inefficient way should only be used to filter out special characters
  private findAndRemoveOrAddSymbols(add: boolean, symbols: string) {
    for(let i: number = 0; i < symbols.length; i++) {
      for(let j: number = 0; j < this.settings.alphabet.length; j++) {
        if(symbols[i] === this.settings.alphabet[j]) {
          this.settings.alphabet = ChangeAlphabetComponent.removeCharacter(this.settings.alphabet, j);
        }
      }
    }
    if(add)
      this.settings.alphabet += symbols;
    this.alphabetControl.setValue(this.settings.alphabet);
  }

  private static removeCharacter(str: string, index: number): string {
    return (str.substring(0, index) + str.substring(index + 1, str.length));
  }
}
