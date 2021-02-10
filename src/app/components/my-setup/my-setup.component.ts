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
  private setupList: Setup[] = [];
  private setup: Setup;

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

  logged: boolean;

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
    let setup = this.setupForm.value
    this.setupService.addOrEditSetup(setup);
  }

  initializeForm() {
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
    this.setupService.getSetups().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key
        sessionStorage.setItem('setup_key', element.key)
        this.setup = x as Setup
        this.initializeForm()
      });
    })
  }

  removeSetup() {
    this.setupService.removeSetup();
  }

  deleteAccount() {
    this.authService.deleteAccount()
  }
}
