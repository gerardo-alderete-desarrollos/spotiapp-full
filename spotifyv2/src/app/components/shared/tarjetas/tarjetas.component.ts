import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  defaultImage = '../../assets/img/loader.gif';

  @Input() items: any[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  verArtista(item: any) {

    let artistaId;

    if ( item.type === 'artist') {
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }

    this.router.navigate(['/artist', artistaId]);

  }

  agregarListaReporduccion(item) {
    console.log('listaReproduccion');
    console.log({item});
  }
  abrirDetalles(item) {
    console.log('Abrir detalles');
    console.log({item});
  }

}
