import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Setup } from 'src/app/interfaces/Interface';
import { SetupService } from 'src/app/services/setup/setup.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    processor: new FormControl('', Validators.required),
    motherboard: new FormControl('', Validators.required),
    graphic_card: new FormControl(''),
    ram: new FormControl('', Validators.required),
    hdd: new FormControl(''),
    sdd: new FormControl(''),
    cooler: new FormControl(''),
    box: new FormControl('', Validators.required),
    power_supply: new FormControl('',Validators.required),
    keyboard: new FormControl(''),
    mouse: new FormControl('')
  });

  displayName: string;

  constructor(public authenticationService:AuthenticationService,
    private setupService: SetupService,private router: Router) { }

  ngOnInit(): void {
    this.displayName = this.authenticationService.displayName;
    if (this.displayName != undefined) {
      const capitalizedName = this.displayName.charAt(0).toUpperCase() + this.displayName.substr(1);
      this.addForm.controls.name.setValue(capitalizedName + "'s Setup");
    } else {
      this.addForm.controls.name.setValue('');
    }
  }

  addSetup() {
    /*
    * Este servicio recoge los datos del formulario y los envia al servicio, que decidira si es un Create o un Update
    */
    let setup = this.addForm.value
    this.setupService.addSetup(setup);
  }
}
