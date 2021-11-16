import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreInterceptor } from './core-interceptor.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CoreInterceptor, multi: true },
  ],
})
export class CoreInterceptorModule {}
