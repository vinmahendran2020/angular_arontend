import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchboxComponent } from './searchbox.component';
import { FormControl } from '@angular/forms';

describe('SearchboxComponent', () => {
  let component: SearchboxComponent;
  let fixture: ComponentFixture<SearchboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate should return {validationError: true} if validationError is defined', () => {
    component.validationError = 'Mock Error Message';
    expect(component.validate(null)).toEqual({ validationError: true });
  });

  it('validate should return {requiredError: true} if requiredError is defined', () => {
    component.value = '';
    component.required = true;
    expect(component.validate({} as any)).toEqual({ required: true });
  });

  it('validate should return {maxLength: true} if maxLength is defined', () => {
    component.value = '1234';
    component.maxLength = 2;
    expect(component.validate({} as any)).toEqual({
      maxLength: { maxLength: 2, actual: 4 },
    });
  });

  it('component should pushChanges update', () => {
    component.pushChanges('100', true);
  });

  it('component should pushChanges no update', () => {
    component.pushChanges('100', false);
  });

  it('component should have validateOnChange property', () => {
    expect(component.hasOwnProperty('validateOnChange')).toEqual(true);
  });

  it('component should have validateOnFocusout property', () => {
    expect(component.hasOwnProperty('validateOnFocusout')).toEqual(true);
  });

  it('getValidationError() return {validationError: true}', () => {
    component.validationError = 'Mock Error';
    expect(component.getValidationError()).toEqual({ validationError: true });
  });

  it('getValidationError() return null', () => {
    component.validationError = '';
    expect(component.getValidationError()).toEqual(null);
  });

  it('getRequiredError() return {required: true}', () => {
    component.required = true;
    component.inputCtrl = new FormControl('');
    component.value = '';
    expect(component.getRequiredError()).toEqual({ required: true });
  });

  it('getRequiredError() return null', () => {
    component.required = false;
    expect(component.getRequiredError()).toEqual(null);
  });

  it('getMaxLengthError() return { maxLength:{maxLength: 5, actual: 10} }', () => {
    component.required = true;
    component.maxLength = 5;
    component.inputCtrl = new FormControl('');
    component.value = '0123456789';
    expect(component.getMaxLengthError()).toEqual({
      maxLength: { maxLength: 5, actual: 10 },
    });
  });

  it('getMaxLengthError() return null', () => {
    component.maxLength = null;
    expect(component.getMaxLengthError()).toEqual(null);
  });

  it('getMinLengthError() return { minLength:{minLength: 5, actual: 3} }', () => {
    component.required = true;
    component.minLength = 5;
    component.inputCtrl = new FormControl('');
    component.value = '123';
    expect(component.getMinLengthError()).toEqual({
      minLength: { minLength: 5, actual: 3 },
    });
  });

  it('getMinLengthError() return null', () => {
    component.minLength = null;
    expect(component.getMinLengthError()).toEqual(null);
  });

  it('getPatternError() return { pattern: "invalid" }', () => {
    component.pattern = '^[0-9A-Za-z]{6}(?:-)[0-9A-Za-z]{4}$';
    component.inputCtrl = new FormControl('');
    component.value = '123';
    expect(component.getPatternError()).toEqual({ pattern: 'invalid' });
  });

  it('getPatternError() return null', () => {
    component.pattern = null;
    expect(component.getPatternError()).toEqual(null);
  });

  it('getPatternError() return null if valid', () => {
    component.pattern = '^[0-9A-Za-z]{6}(?:-)[0-9A-Za-z]{4}$';
    component.inputCtrl = new FormControl('');
    component.value = 'xxxxxx-xxxx';
    expect(component.getPatternError()).toEqual(null);
  });

  it('should onIconClick', () => {
    component.onIconClick();
  });

  it('should writeValue', () => {
    component.writeValue('100');
    expect(component.value).toBe('100');
  });

  it('should writeValue', () => {
    component.writeValue('100');
    expect(component.value).toBe('100');
  });

  it('should onChange', () => {
    component.onChange('100');
  });

  it('should onTouched', () => {
    component.onTouched();
  });

  it('should registerOnChange', () => {
    const change = (_: any): {} => {
      return {};
    };
    component.registerOnChange(change);
    expect(component.onChange).toBe(change);
  });

  it('should registerOnTouched', () => {
    const touched = (): {} => {
      return {};
    };
    component.registerOnTouched(touched);
    expect(component.onTouched).toBe(touched);
  });

  it('setDisabledState() update component.isDisabled', () => {
    component.setDisabledState(true);
    expect(component.isDisabled).toEqual(true);
  });

  describe('generateId', () => {
    it('returns undefined if there is no uniqueId', () => {
      expect(component.generateId()).not.toBeDefined();
    });

    it('returns the uniqueId if it exists', () => {
      component.uniqueId = 'mycomponent';
      expect(component.generateId()).toBe('mycomponent');
    });

    it('appends a prefix if given', () => {
      component.uniqueId = 'mycomponent';
      expect(component.generateId('dtcc')).toBe('dtcc_mycomponent');
    });
  });
});
