import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { AppState } from "../app.reducer";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../service/ingreso-egreso.service";
import * as ui from "../shared/ui.actions";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo: string = "ingreso";
  lodingGuardar: boolean = false;
  uiSubcription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],
    });
    this.uiSubcription = this.store
      .select("ui")
      .subscribe((ui) => (this.lodingGuardar = ui.isLoading));
  }

  ngOnDestroy() {
    this.uiSubcription.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire("Registro creado", descripcion, "success");
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire("Error", err.message, "error");
      });
  }
}
