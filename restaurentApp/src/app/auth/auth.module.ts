import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';


const routes: Routes = [
  { path: '', component: AuthComponent }
];
@NgModule({
    declarations: [AuthComponent],
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule, FormsModule]
})
export class AuthModule {

}
