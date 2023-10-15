import { inject } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap(isAuthenticated => console.log(isAuthenticated)),

    tap((isAuthenticated) => {

      if( isAuthenticated ) {
        router.navigate(['./'])
      }
    }),
    map(isAuthenticated => !isAuthenticated),
    tap(isAuthenticated => console.log(isAuthenticated)),

  )
}

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivatePublicGuard: CanActivateFn = () => {
  return checkAuthStatus();

};

export const canMatchPublicGuard: CanMatchFn = () => {

  return checkAuthStatus();

};
