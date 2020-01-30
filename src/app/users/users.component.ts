import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { MatTableDataSource, MatDialog, MatSnackBar } from "@angular/material";
import { CreateUserComponent } from "../modals/create-user/create-user.component";
import { MatPaginator } from "@angular/material/paginator";
import { StorageService } from "../services/storageservice";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "name",
    "username",
    "email",
    "action"
  ];
  dataSource = new MatTableDataSource<any>([]);
  constructor(
    private apiService: ApiserviceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    console.log(this.storageService.select("users"));
    if (this.storageService.select("users")) {
      this.dataSource.data = this.storageService.select("users");
      this.dataSource.paginator = this.paginator;
    } else {
      this.getUsersList();
    }
  }
  deleteUser(element) {
    this.apiService.delete(`users/${element.id}`).subscribe((data: any) => {
      try {
        let userData = this.dataSource.data;
        userData = userData.filter((each:any) => each !== element);
        this.dataSource.data  = userData;
        this._snackBar.open(
          `User Deleted successfully`,
          "",
          {
            duration: 2000
          }
        );
        this.storageService.setVal("users", this.dataSource.data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
  openDialog(data?): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: "250px",
      disableClose: true,
      data: { ...data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actionOnUser(result, data ?data.id : '');
      }
    });
  }
  actionOnUser(result, id?) {
    const url = id ? `users/${id}` : "users";
    const method = id ? "put" : "post";
    this.apiService[method](url, { ...result }).subscribe((data: any) => {
      try {
        const createdUserData = this.dataSource.data;
        if (id) {
          createdUserData[id - 1] = data;
        } else {
          createdUserData.push(data);
        }
        this.dataSource.data = createdUserData;
        this.dataSource.paginator = this.paginator;
        this._snackBar.open(
          `User ${id ? "Updated" : "Created"} successfully`,
          "",
          {
            duration: 2000
          }
        );
        this.storageService.setVal("users", this.dataSource.data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
  getUsersList() {
    this.apiService.getApi("users").subscribe((data: any) => {
      try {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
}
