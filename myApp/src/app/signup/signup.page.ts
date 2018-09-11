import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupSuccess: boolean;
  username: string;
  password: string;
  email: string;
  confirm: string;

  /** コンストラクタ */
  constructor(public nav: NavController, public modal: ModalController, public auth: AuthService) {}

  /** サインアップボタンが押された時 */
  onSubmitSignUp() {
    this.auth.signUp(this.username, this.password, this.email).subscribe(
      () => this.signupSuccess = true,
      error => console.error(error)
    );
  }

  /** 検証ボタンが押された時 */
  onSubmitConfirmation() {
    const confirmationCode = this.confirm;
    this.auth.confirmSignUp(this.username, confirmationCode).subscribe(
      () => {
        this.auth.signIn(this.username, this.auth.password).subscribe(
          () => {
            this.nav.navigateRoot('home')
            this.modal.dismiss();
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  /** モーダルを閉じる */
  onDismiss() {
    this.modal.dismiss();
  }

}
