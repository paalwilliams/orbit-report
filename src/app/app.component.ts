import { Component } from "@angular/core";
import { Satellite } from "./satellite";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "orbit-report";
  sourceList: Satellite[];
  displayList: Satellite[];
  constructor() {
    this.sourceList = [];
    let satellitesUrl =
      "https://handlers.education.launchcode.org/static/satellites.json";
    this.displayList = [];
    window.fetch(satellitesUrl).then(
      function (response) {
        response.json().then(
          function (data) {
            console.log(data);
            let fetchedSatellites = data.satellites;
            fetchedSatellites.forEach((x) => {
              let mySatellite = new Satellite(
                x.name,
                x.type,
                x.launchDate,
                x.orbitType,
                x.operational
              );
              this.sourceList.push(mySatellite);
            });
            this.displayList = this.sourceList.slice(0);
          }.bind(this)
        );
      }.bind(this)
    );
  }
  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for (let i = 0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }
}
