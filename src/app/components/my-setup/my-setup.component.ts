import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Setup } from 'src/app/interfaces/Interface';
import { SetupService } from 'src/app/services/setup/setup.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-setup',
  templateUrl: './my-setup.component.html',
  styleUrls: ['./my-setup.component.scss']
})
export class MySetupComponent implements OnInit {
/*
* Este es el componente donde realmente se realiza el CRUD, podemos obtener nuestro setup,
* tambien podemos guardar o actualizar el que ya tenemos, o borrar el setup que ya tenemos.
* Para finalizar, podemos borrar nuestra cuenta, pero será un borrado "logico", ya que aunque el
* usuario si desaparezca, los datos de el usuario y su setup no se borraran.
*
* Esto es debido a mejoras en el proyecto en un futuro. Me gustaria hacer una lista con todos los setups, y aunque
* ese setup sea "anonimo", se podrá visualizar.
*/
  private setup: Setup;
  logged: boolean = false;

  setupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    processor: new FormControl(''),
    motherboard: new FormControl(''),
    graphic_card: new FormControl(''),
    ram: new FormControl(''),
    hdd: new FormControl(''),
    sdd: new FormControl(''),
    cooler: new FormControl(''),
    box: new FormControl(''),
    power_supply: new FormControl(''),
    keyboard: new FormControl(''),
    mouse: new FormControl('')
  });

  constructor(private setupService: SetupService, private authService: AuthenticationService ,private router: Router) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('uid') != undefined  ||  sessionStorage.getItem('uid') != null) {
      this.logged = true
    } else {
      this.logged = false;
      this.router.navigate(['/home'])
    }
  }

  addSetup() {
    /*
    * Este servicio recoge los datos del formulario y los envia al servicio, que decidira si es un Create o un Update
    */
    let setup = this.setupForm.value
    this.setupService.addOrEditSetup(setup);
  }

  initializeForm() {
    /*
    * Inicializa el formulario con los datos del propio usuario cuando se pulsa el boton "Get My Setup"
    */
    this.setupForm.controls.name.setValue(this.setup.name);
    this.setupForm.controls.graphic_card.setValue(this.setup.graphic_card);
    this.setupForm.controls.motherboard.setValue(this.setup.motherboard);
    this.setupForm.controls.ram.setValue(this.setup.ram);
    this.setupForm.controls.processor.setValue(this.setup.processor);
    this.setupForm.controls.hdd.setValue(this.setup.hdd);
    this.setupForm.controls.sdd.setValue(this.setup.sdd);
    this.setupForm.controls.cooler.setValue(this.setup.cooler);
    this.setupForm.controls.box.setValue(this.setup.box);
    this.setupForm.controls.power_supply.setValue(this.setup.power_supply);
    this.setupForm.controls.keyboard.setValue(this.setup.keyboard);
    this.setupForm.controls.mouse.setValue(this.setup.mouse);
  }

  getSetup() {
    /*
    * Cuando se va a obtener un Setup, nos suscribimos al servicio, y guardamos los datos en la variable Setup.
    * Tambien guardamos la clave del propio setup, y llamamos al metodo que inicializa el formulario con los datos.
    */
    this.setupService.getSetups().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON(); //payload es para acceder a los datos.
        x['$key'] = element.key
        sessionStorage.setItem('setup_key', element.key) //Guardar key del setup en el sessionStorage
        this.setup = x as Setup
        this.initializeForm()
      });
    })
  }

  removeSetup() {
    /*
    * Este metodo llama al servicio SetupService para borrar el setup
    */
    this.setupService.removeSetup();
  }

  deleteAccount() {
    /*
    * Este metodo llama al servicio authService para borrar el usuario
    */
    this.authService.deleteAccount()
  }
}
