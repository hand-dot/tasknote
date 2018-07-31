import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tasknote } from './tasknote';
import { SuperTabsModule } from 'ionic2-super-tabs';
 
@NgModule({
  declarations: [
    Tasknote,
  ],
  imports: [
    IonicPageModule.forChild(Tasknote),
    SuperTabsModule
  ],
})
export class HomePageModule {}