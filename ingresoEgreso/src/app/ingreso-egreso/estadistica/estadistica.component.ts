import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Label, MultiDataSet } from "ng2-charts";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { IngresoEgreso } from "../../models/ingreso-egreso.model";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresoSubs: Subscription;

  ingresos: number = 0;
  egresos: number = 0;

  totaIngresos: number = 0;
  totalEgresos: number = 0;

  public doughnutChartLabels: Label[] = ["Ingreso", "Egreso"];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.ingresoSubs = this.store
      .select("ingresosEgresos")
      .subscribe(({ items }) => {
        this.generarEstadistica(items);
      });
  }

  ngOnDestroy() {
    this.ingresoSubs.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totaIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    for (const item of items) {
      if (item.tipo === "ingreso") {
        this.totaIngresos += item.monto;
        this.ingresos++;
      } else if (item.tipo === "egreso") {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = [[this.totaIngresos, this.totalEgresos]];
  }
}
