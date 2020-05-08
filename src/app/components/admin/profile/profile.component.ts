import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from '../../../shared/models/user.interface';
import { AuthService } from './../../../shared/services/auth.service';
import { FileI } from './../../../shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public image: FileI;
  public currentImage: string = 'https://www.tuplanweb.com/proyecto/Plantilla/img/user/edwin.jpg';

  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value:'', disable: true}, Validators.required),
    photoURL: new FormControl('', Validators.required),
  })
  ngOnInit() {
    this.authSvc.userData$.subscribe(user =>{
      this.initValuesForm(user);
    });
  }
  onSaveUser(user:UserI): void{
    //this.authSvc.saveUserProfile(user, this.image);
    this.authSvc.preSaveProfile(user, this.image);
  }
  private initValuesForm(user: UserI){
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    })
  }
  handleImage(image: FileI):void{
    this.image = image;
  }
}
