import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LodingSpinnerComponent } from './loding-spinner/loding-spinner.component';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LodingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LodingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {

}
