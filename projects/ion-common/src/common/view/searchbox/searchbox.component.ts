import {
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SearchboxComponent),
      multi: true,
    },
  ],
})
export class SearchboxComponent
  implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  @Input() uniqueId: string;
  @Input() name: string;
  @Input() labelClassName;
  @Input() inputClassName = '';
  @Input() label: string;
  @Input() toolTip: string;
  @Input() tooltipPlacement: 'top' | 'right' | 'auto' | 'left' | 'bottom' =
    'top';
  @Input() required: boolean;
  @Input() requiredError: string;
  @Input() isDisabled: boolean;
  @Input() minLength: number;
  @Input() minLengthError: string;
  @Input() maxLength: number;
  @Input() maxLengthError: string;
  @Input() patternError: string;
  @Input() placeholder = '';
  @Input() pattern: string;
  @Input() validateOnChange = false;
  @Input() validateOnFocusout = true;
  _validationError = '';
  get validationError(): string {
    return this._validationError;
  }

  @Input()
  set validationError(value: string) {
    this._validationError = value;
    this.pushChanges(this.value, true);
  }

  @Output() iconClick = new EventEmitter<void>();
  onIconClick() {
    this.iconClick.emit();
  }

  inputCtrl: FormControl;
  value = '';
  errorType = null;

  onChange$: Subject<any> = new Subject<any>();
  onChangeSubscription: Subscription;

  ngOnInit() {
    /**
     * Attaching debounceTime pipe with onChange$.
     * And subscribing to call onChange(value)
     * this will unsubscribe() in ng
     */
    this.onChangeSubscription = this.onChange$
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.onChange(value);
      });
  }

  pushChanges(value: string, canUpdate) {
    if (canUpdate) {
      this.onChange$.next(value);
    }
  }

  ngOnDestroy() {
    this.onChangeSubscription.unsubscribe();
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  generateId(prefix?: string) {
    if (this.uniqueId) {
      return prefix ? `${prefix}_${this.uniqueId}` : this.uniqueId;
    }
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  getInputClassName() {
    return `form-control ${this.inputClassName}`;
  }

  getValidationError() {
    if (this.validationError && this.validationError.length > 0) {
      return {
        validationError: true,
      };
    }
    return null;
  }

  getRequiredError() {
    if (!this.value && this.inputCtrl && this.required) {
      this.errorType = 'required';
      return { required: true };
    }
    return null;
  }

  getMaxLengthError() {
    if (this.maxLength && this.value && this.value.length > this.maxLength) {
      this.errorType = 'maxLength';
      return {
        maxLength: { maxLength: this.maxLength, actual: this.value.length },
      };
    }
    return null;
  }

  getMinLengthError() {
    if (this.minLength && this.value && this.value.length < this.minLength) {
      this.errorType = 'minLength';
      return {
        minLength: {
          minLength: this.minLength,
          actual: this.value.length,
        },
      };
    }
    return null;
  }

  getPatternError() {
    if (this.value && this.pattern) {
      const re = new RegExp(this.pattern);
      this.errorType = false;
      if (re.test(this.value)) {
        return null;
      } else {
        this.errorType = 'pattern';
        return {
          pattern: 'invalid',
        };
      }
    }
    return null;
  }

  validate(c: FormControl): ValidationErrors | null {
    this.inputCtrl = c;
    this.errorType = null;
    const validationError = this.getValidationError();
    const requiredError = this.getRequiredError();
    const maxLengthError = this.getMaxLengthError();
    const minLengthError = this.getMinLengthError();
    const patternError = this.getPatternError();
    return validationError
      ? validationError
      : requiredError
      ? requiredError
      : maxLengthError
      ? maxLengthError
      : minLengthError
      ? minLengthError
      : patternError
      ? patternError
      : null;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
