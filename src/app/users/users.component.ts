import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../apiservice.service";
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["position", "name", "username", "email", "action"];
  dataSource = new MatTableDataSource<any>([]);
  usersList: any[]
  constructor(private apiService: ApiserviceService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getUsersList()
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getUsersList() {
    this.apiService.getApi("users").subscribe((data: any) => {
      try {
        this.dataSource.data = data;
        console.log(data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
}
