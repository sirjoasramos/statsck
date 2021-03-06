import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SofascoreComponent } from './sofascore/sofascore.component';

import { HttpClientModule } from '@angular/common/http';
import { QueryComponent } from './query/query.component';
import { NgChartsModule } from 'ng2-charts';
import { TorneioComponent } from './torneio/torneio.component';
import { TimesComponent } from './times/times.component';
import { StatsComponent } from './stats/stats.component';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { MainComponent } from './main/main.component';
import { ClassificacaoComponent } from './classificacao/classificacao.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SofascoreComponent,
    QueryComponent,
    TorneioComponent,
    TimesComponent,
    StatsComponent,
    InfoComponent,
    MainComponent,
    ClassificacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule, 
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
