import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { <%= classify(name)%>EntityService } from '@app/<%= dasherize(name)%>/store/<%= dasherize(name)%>-entity.service';

import { Logger } from '@app/core';
const log = new Logger('<%= classify(name)%>Resolver');

@Injectable()
export class <%= classify(name)%>Resolver implements Resolve<boolean> {
  loading = false;
  constructor(private <%= camelize(name)%>EntityService: <%= classify(name)%>EntityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.<%= camelize(name)%>EntityService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.<%= camelize(name)%>EntityService.getAll();
        }
      }),
      filter(loaded => loaded),
      first(),
    );
  }
}
