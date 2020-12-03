import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AppState } from "../app.reducer";
import * as ingresoAgresoActions from "../ingreso-egreso/ingreso-egreso.actions";
import { IngresoEgresoService } from "../service/ingreso-egreso.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  ingresoEgresoSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.userSubs = this.store
      .select("user")
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this.ingresoEgresoSubs = this.ingresoEgresoService
          .initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresosFb) => {
            this.store.dispatch(
              ingresoAgresoActions.setItems({ items: ingresosEgresosFb })
            );
          });
      });
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }
}
