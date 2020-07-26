import { NgModule } from '@angular/core';
import { ShoppingRoutingModule } from './shopping.routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [ShoppingRoutingModule, FormsModule, RouterModule, SharedModule]
})
export class ShoppingModule {

}
