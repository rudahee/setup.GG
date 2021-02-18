import { Injectable } from '@angular/core';
import { Setup, User } from 'src/app/interfaces/Interface';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from '../authentication/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { SetupComponent } from 'src/app/components/setup/setup.component';


@Injectable({
  providedIn: 'root'
})
export class SetupService {
/*
* Este servicio contiene el CRUD del setup.
*/
  private uid: String;
  public setupList: Setup[] = [];
  public setup: Setup;
  private setupDB: AngularFireList<any>;

  constructor(private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private http: HttpClient,
    private router: Router) {

      this.setupDB = this.db.list('/setups/');
  }

  ngOnInit(): void {
    this.obtainCurrentUser();
  }

  obtainCurrentUser() {
    this.auth.currentUser.then(
      user => {
         this.uid = user.uid;
      }
    )
  }

  getSetups() {
    this.setupList = [];
    //Metodo GET, obtenemos el setup del usuario loggeado.
    this.db.list('/setups/').snapshotChanges().subscribe(
      items => {

        items.forEach(
          element => {
            let setupAux:Setup = element.payload.toJSON() as Setup;
            setupAux['$key'] = element.key;
            this.setupList.push(setupAux)
          });
      });

    return this.setupList;
  }

  addSetup(setup: Setup) {
    //this.obtainCurrentUser()
    this.db.list('/setups/').push({
      box: setup.box,
      cooler: setup.cooler,
      graphic_card: setup.graphic_card,
      hdd: setup.hdd,
      keyboard: setup.keyboard,
      motherboard: setup.motherboard,
      mouse: setup.mouse,
      name: setup.name,
      power_supply: setup.power_supply,
      processor: setup.processor,
      ram: setup.ram,
      sdd: setup.sdd,
    }).then(r => {
      Swal.fire({
        title: "Success",
        text: "Saved Setup",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "Go Setup",
        showCancelButton: true,
        cancelButtonText: "Go Home",
        allowEscapeKey: false,
        allowOutsideClick: false
      }).then(
        result => {
          if (result.isConfirmed) {

            this.router.navigate(['/setup/'+r.key])
          } else {
            this.router.navigate(['/home']);
          }
        }
      )
    }
    );
  }

  getOneSetupByKey(key: string) {
    return this.http.get('https://db-setupgg-default-rtdb.firebaseio.com/setups.json').pipe(
      map(res => this.obtenerSetup(res, key))
    )
  }

  private obtenerSetup(res: object, key: string) {
    let setupReturn: Setup;
    Object.keys(res).forEach(k => {
      const set: Setup = res[k];

      set.$key = k;

      if (set.$key == key) {
        setupReturn = set;
      }
    })
    return setupReturn
  }


  deleteSetup(key: string) {
    this.db.object('/setups/'+key).remove();
  }

  editSetup(setup: Setup, key: string) {
      //this.obtainCurrentUser()
      this.db.list('/setups/').update(key, {
        box: setup.box,
        cooler: setup.cooler,
        graphic_card: setup.graphic_card,
        hdd: setup.hdd,
        keyboard: setup.keyboard,
        motherboard: setup.motherboard,
        mouse: setup.mouse,
        name: setup.name,
        power_supply: setup.power_supply,
        processor: setup.processor,
        ram: setup.ram,
        sdd: setup.sdd,
      }).then(r => {
        Swal.fire({
          title: "Success",
          text: "Saved Setup",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Go Setup",
          showCancelButton: true,
          cancelButtonText: "Go Home",
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then(
          result => {
            if (result.isConfirmed) {

              this.router.navigate(['/setup/'+key])
            } else {
              this.router.navigate(['/home']);
            }
          }
        )
      }
      );
  }
}
