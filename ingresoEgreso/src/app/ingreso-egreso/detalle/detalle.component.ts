import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { IngresoEgreso } from "../../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../../service/ingreso-egreso.service";
import { AppStateWhithIngreso } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;

  constructor(
    private store: Store<AppStateWhithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.ingresosSubs = this.store
      .select("ingresosEgresos")
      .subscribe(({ items }) => (this.ingresosEgresos = items));
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid: string) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => Swal.fire("Borrado", "Item borrado", "success"))
      .catch((err) => Swal.fire("Error", err.message, "error"));
  }
}
