import { Component } from '@angular/core';
import { DataserviceService } from './core/dataservice.service';
import { TownOrCity } from './core/town-or-city';
import { $ } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientSideCaching';
  version = 1.0;
  tableColumns: string[] = ['Tettsted', 'Kommune', 'Folkemengde'];
  dataSource: TownOrCity[];

  constructor(private dataService: DataserviceService) {

  }

  fetchTownsJsonData() {
    this.dataService.getAllTownsAndCities()
    .subscribe((data: TownOrCity[]) => {
      this.dataSource = data;
      console.log(data);

    });
  }

  ngOnInit() {




  }



}
