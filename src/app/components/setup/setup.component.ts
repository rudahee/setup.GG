import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setup } from 'src/app/interfaces/Interface';
import { SetupService } from 'src/app/services/setup/setup.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  setup: Setup = {
    name: ''
  };

  @Input('cdkCopyToClipboard')
  url: string

  key: string;

  constructor(private route: ActivatedRoute,
    private setupService: SetupService,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar,
    private router: Router) {
  }


  ngOnInit(): void {

    this.url = window.location.href;
    this.key = this.route.snapshot.paramMap.get('id').toString().trim();

    this.setupService.getOneSetupByKey(this.key).subscribe(
      k => {
        this.setup = k;
      }
    );

  }

  share() {
    this.clipboard.copy(this.url)
    this.snackbar.open('Link Copied!', 'Close' , {
      duration: 1500
    });
  }

  delete() {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure to delete this setup?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Yes I want",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then(
      result => {
        if (result.isConfirmed) {
          this.setupService.deleteSetup(this.key);
          this.router.navigate(['/home'])
    }})
  }
}

