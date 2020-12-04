import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { dashboardRoutes } from "./dashboard.routes";

const rutasHIjas: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(rutasHIjas)],
  exports: [RouterModule],
})
export class DashboardRoutesModule {}
