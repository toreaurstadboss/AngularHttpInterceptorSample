import { Component, ViewChild, OnInit } from '@angular/core';
import { DataserviceService } from './core/dataservice.service';
import { TownOrCity } from './core/town-or-city';
import { MatTable } from '@angular/material';
import { CacheService } from './core/cache.service';
import { LoggerService } from './core/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ClientSideCaching';
  version = 1.0;
  tableColumns: string[] = ['Tettsted', 'Kommune', 'Folkemengde'];
  dataSource: TownOrCity[];
  @ViewChild('Tettstedstabell', {static: true}) private tettstedsTabell: MatTable<any>;

  constructor(private dataService: DataserviceService, private cacheService: CacheService, private loggerService: LoggerService) {

  }

  handleUpdateFetchTownsJsonData(data: TownOrCity[]) {
    this.dataSource = data;
  }

  clearTownsJsonData() {
      this.dataSource = undefined;
      this.cacheService.invalidateCache();
  }

  fetchTownsJsonData() {
    this.dataService.getAllTownsAndCities()
    .subscribe({
      next: this.handleUpdateFetchTownsJsonData.bind(this)
    });
  }

  ngOnInit(): void {
    this.loggerService.log('Ready for some clientside caching!');
  }

}
