import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import merge from 'lodash.merge';
import get from 'lodash.get';
import set from 'lodash.set';

import { Logout, CoreService } from 'ion-core';

export function storageMetaReducer<S, A extends Action = Action>(
  reducer: ActionReducer<S, A>
): (state: S, action: A) => S {
  function getFeatureState(state: Partial<S>, features: string[]): unknown {
    const savedFeatures = features.reduce((saved, feature) => {
      const featureState = get(state, feature);
      if (featureState) {
        set(saved, feature, featureState);
      }
      return saved;
    }, {} as Partial<S>);
    return savedFeatures;
  }

  return (state: S, action: A): S => {
    const nextState = reducer(state, action);
    const features = ['core'];
    if (action.type === '@ngrx/store/init') {
      const savedState = JSON.parse(
        sessionStorage.getItem(CoreService.STORAGE_KEY) || '{}'
      );
      merge(nextState, getFeatureState(savedState, features));
    }
    sessionStorage.setItem(
      CoreService.STORAGE_KEY,
      JSON.stringify(getFeatureState(nextState, features))
    );
    return nextState;
  };
}

export function logoutMetaReducer<S, A extends Action = Action>(
  reducer: ActionReducer<S, A>
): (state: S, action: A) => S {
  return (state: S, action: A): S => {
    if (action.type === Logout.Type) {
      state = undefined;
      sessionStorage.removeItem(CoreService.STORAGE_KEY);
    }
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<unknown> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<any>[] = [
  storageMetaReducer,
  logoutMetaReducer,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
