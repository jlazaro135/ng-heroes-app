import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
    tap((isAuthenticated) => {

      if( !isAuthenticated ) {
        router.navigate(['/auth/login'])
      }

    })
  )
}

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateAuthGuard: CanActivateFn = () => {

  return checkAuthStatus();

};

export const canMatchAuthGuard: CanMatchFn = () => {

  return checkAuthStatus();

};
