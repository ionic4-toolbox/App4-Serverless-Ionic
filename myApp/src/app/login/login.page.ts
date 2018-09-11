import { Component } from '@angular/core';
import { ToastController, ModalController, NavController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
import { AuthService }  from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public nav: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public auth: AuthService) {
  }

  /** ログインボタンがされた時 */
  onSubmit() {
    this.auth.signIn(this.username, this.password).subscribe(
      () => this.nav.navigateRoot('home'),
      async () => {
        const toast = await this.toastCtrl.create({
          message: 'ﾕｰｻﾞｰ名またはﾊﾟｽﾜｰﾄﾞが違います',
          duration: 2000
        });
        toast.present();
      }
    );
  }

  /**
   * サインアップボタンをクリック時
   */
  async onClickSignUp() {
    const modal = await this.modalCtrl.create({ component: SignupPage });
    modal.present();
  }

}
