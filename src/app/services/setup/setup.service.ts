import { Injectable } from '@angular/core';
import { Setup } from 'src/app/interfaces/Interface';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class SetupService {
/*
* Este servicio contiene el CRUD del setup.
*/
  private setupDB: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.setupDB = this.db.list('/users/'+sessionStorage.getItem('uid')+'/setup');
   }

   getSetups() {
    //Metodo GET, obtenemos el setup del usuario loggeado.
    return this.setupDB = this.db.list('/users/'+sessionStorage.getItem('uid')+'/setup');
  }

  addOrEditSetup(setup: Setup) {
    //Si existe un setup_key en el localStorage es que ya existe un setup, por tanto debemos actualizar.
    if (sessionStorage.getItem('setup_key') != undefined && sessionStorage.getItem('setup_key') != null) {

      //Metodo UPDATE
      this.db.list('/users/'+sessionStorage.getItem('uid')+'/setup/').update(sessionStorage.getItem('setup_key'), {
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
      })

    } else {
      // Si no existe el setup_key, debemos crear uno nuevo.

      // Metodo CREATE
      this.setupDB.push({
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
      });
  }
  }

  removeSetup() {
    // Metodo DELETE, tambien borramos la key del sessionStorage.
    this.db.list('/users/'+sessionStorage.getItem('uid')+'/setup').remove()
    sessionStorage.removeItem('setup_key')
  }
}
