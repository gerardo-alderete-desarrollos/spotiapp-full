import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { MaterialModule } from '../../material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent,
    TarjetasComponent,
    NavbarHomeComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })

  ],
  exports: [
    LoadingComponent,
    NavbarComponent,
    TarjetasComponent,
    NavbarHomeComponent

  ]
})
export class SharedModule { }
