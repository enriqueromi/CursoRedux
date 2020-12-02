import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { AppState } from "../../app.reducer";
import { AuthService } from "../../service/auth.service";
import * as ui from "../../shared/ui.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.uiSubscription = this.store
      .select("ui")
      .subscribe((ui) => (this.loading = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: "Espere por favor",
    //   willOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then((usuario) => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(["/"]);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  }
}
