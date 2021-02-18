import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/services/setup/setup.service';
import { Setup, User } from 'src/app/interfaces/Interface';

@Component({
  selector: 'app-all-setups',
  templateUrl: './all-setups.component.html',
  styleUrls: ['./all-setups.component.scss']
})
export class AllSetupsComponent implements OnInit {

  constructor(private setupService: SetupService) { }

  allSetups: Setup[];

  ngOnInit(): void {
    this.allSetups = this.setupService.getSetups()
  }
}
