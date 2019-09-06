import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UtilitiesService } from '../shared/utilities.service';

// const headers = new HttpHeaders({
//   'Authorization': `Bearer ${token}`
//  });
 
 const base = environment.urls.base ;
 const search = environment.urls.search ;
 const new_realeases = environment.urls.new_realeases ;
 const artista = environment.urls.artist ;
 const top_tracks = environment.urls.top_tracks ;

 const baseBack = environment.urls_back.base ;
 const token = environment.urls_back.token;
 const login = environment.urls_back.login;


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  token = '';
  handleError = new  Subject<Object>();
  loading = new Subject<boolean>();

  constructor(private http: HttpClient,
    private utilities: UtilitiesService) { }

  getNewReleases(limit = environment.config.limit) {
    const headers = this.getHeaders();


    return new Promise( (res, rej) => {
      this.http.get(base + new_realeases + `?limit=${limit}`, { headers })
          .pipe(
            map( data => data['albums'].items)
          )
          .subscribe(
            data => {
              this.sendHandleError(false);
              res(data);
            },
            error => {
              this.sendHandleError(true, error.error ? error.error.error : error.message);
              rej(error);
            });
    });
  }

  getArtistas( termino: string ) {
    const headers = this.getHeaders();

    return new Promise( (res, rej) => {
      this.http.get(base + search + `${ termino }&type=artist`, { headers })
            .pipe(
              map( data =>  data['artists'].items)
            )
            .subscribe(
              data => {
                this.sendHandleError(false);
                this.sendIsLoading(true);
                res(data);
              },
              error => {
                this.sendHandleError(true, error.error ? error.error.error : error.message);
                this.sendIsLoading(true);
                rej(error);
              }
            );
    });
  }

  getArtista( id: string ) {
    const headers = this.getHeaders();

    return new Promise( (res, rej) => {
      this.http.get(base + artista + id , { headers })
        .subscribe(
          data => {
            this.sendHandleError(false);
            this.sendIsLoading(true);
            res(data);
          },
          error => {
            this.sendHandleError(true, error.error ? error.error.error : error.message);
            this.sendIsLoading(true);
            rej(error);
          });
    });
  }

  async getTopTracks( id: string ) {
    const headers = this.getHeaders();

    return new Promise( (res, rej) => {
      this.http.get(base + artista + id + top_tracks , { headers })
            .pipe(
              map( data =>  data['tracks'])
            ).subscribe(
              data => {
                this.sendHandleError(false);
                this.sendIsLoading(true);
                res(data);
              },
              error => {
                this.sendHandleError(true, error.error ? error.error.error : error.message);
                this.sendIsLoading(true);
                rej(error);
              });
    });
 }
  async getAlbums() {
    console.log('getAlbums')
    const headers = this.getHeaders();

    return new Promise( (res, rej) => {
      this.http.get(base + 'albums'   , { headers })
            .pipe(
              // map( data =>  data['tracks'])
            ).subscribe(
              data => {
                console.log({data});
                this.sendHandleError(false);
                this.sendIsLoading(true);
                res(data);
              },
              error => {
                console.log({error});

                this.sendHandleError(true, error.error ? error.error.error : error.message);
                this.sendIsLoading(true);
                rej(error);
              });
    });
 }

  getToken() {
   const body = {
    grant_type : 'client_credentials',
    client_id : environment.credentials.client_id,
    client_secret : environment.credentials.client_secret
   };

   return  new Promise( (res, rej) => {
    this.http.post( baseBack + token, body ).subscribe(
      data => {
       this.token = data['body'].access_token;
       this.sendHandleError(false);

       res(data);
      },
      error => {
        this.sendHandleError(true, error);
       rej(error);
      }
    );
   });
 }

 
 auth( email: string, password: string ) {
  const body = {
    email : email,
    password : password,
   };
  return  new Promise( (res, rej) => {
    this.http.post( baseBack + login, body ).subscribe(
      ( data: any ) => {
        console.log('isAuth');
       this.utilities.setToken(data.token);
       this.utilities.setCurrentUser(data.usuario);
       this.utilities.login();
       this.sendHandleError(false);

       res(data);
      },
      error => {
        this.sendHandleError(true, error);
        this.utilities.setToken('');
       rej(error);
      }
    );
   });
 }

 getHeaders() {
   return  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
     });
 }

 sendHandleError( error: boolean , message: string = '' ) {
   this.handleError.next({
     error: error,
     message: message
   });
 }

 sendIsLoading( isLoading: boolean ) {
  console.log({isLoading});
  this.loading.next(isLoading);
 }

}