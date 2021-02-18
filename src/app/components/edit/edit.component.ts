import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Setup } from 'src/app/interfaces/Interface';
import { SetupService } from 'src/app/services/setup/setup.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  key: string;
  setup: Setup = {
    name: ''
  };

  editForm = new FormGroup({
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

  constructor(private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.key = this.route.snapshot.paramMap.get('id').toString().trim();

    this.setupService.getOneSetupByKey(this.key).subscribe(
      k => {
        this.setup = k;
        this.editForm.controls['name'].setValue(this.setup.name);
        this.editForm.controls.processor.setValue(this.setup.processor);
        this.editForm.controls.motherboard.setValue(this.setup.motherboard);
        this.editForm.controls.graphic_card.setValue(this.setup.graphic_card);
        this.editForm.controls.ram.setValue(this.setup.ram);
        this.editForm.controls.hdd.setValue(this.setup.hdd);
        this.editForm.controls.sdd.setValue(this.setup.sdd);
        this.editForm.controls.cooler.setValue(this.setup.cooler);
        this.editForm.controls.box.setValue(this.setup.box);
        this.editForm.controls.power_supply.setValue(this.setup.power_supply);
        this.editForm.controls.keyboard.setValue(this.setup.keyboard);
        this.editForm.controls.mouse.setValue(this.setup.mouse);
      }
    );
  }

  editSetup() {
    /*
    * Este servicio recoge los datos del formulario y los envia al servicio, que decidira si es un Create o un Update
    */
    let setup = this.editForm.value
    this.setupService.editSetup(setup, this.key);
  }

}
