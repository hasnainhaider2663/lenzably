import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(): Observable<boolean> {

    return this.afAuth.authState
      .pipe(take(1)).pipe(map(user => {
        return !!user;
      }))
      .pipe(map(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/user/login']);
        }
        return loggedIn;
      }));
  }
}
