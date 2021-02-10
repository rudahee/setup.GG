import { Injectable } from '@angular/core';
import { Setup, User } from 'src/app/interfaces/Interface';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private setupDB: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.setupDB = this.db.list('/users/'+sessionStorage.getItem('uid')+'/setup');
   }

   getSetups() {
    return this.setupDB = this.db.list('/users/'+sessionStorage.getItem('uid')+'/setup');
  }


  addOrEditSetup(setup: Setup) {
    if (sessionStorage.getItem('setup_key') != undefined || sessionStorage.getItem('setup_key') != null) {

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
    this.db.list('/users/'+sessionStorage.getItem('uid')+'/setup').remove()
    sessionStorage.removeItem('setup_key')
  }
}
