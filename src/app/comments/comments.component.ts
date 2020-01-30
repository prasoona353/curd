import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { ApiserviceService } from '../services/apiservice.service';
import { StorageService } from '../services/storageservice';
import { CreateCommentComponent } from '../modals/create-comment/create-comment.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "name",
    "email",
    "body",
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
    console.log(this.storageService.select("comments"));
    if (this.storageService.select("comments")) {
      this.dataSource.data = this.storageService.select("comments");
      this.dataSource.paginator = this.paginator;
    } else {
      this.getCommentsList();
    }
  }
  deleteComment(element) {
    this.apiService.delete(`comments/${element.id}`).subscribe((data: any) => {
      try {
        let userData = this.dataSource.data;
        userData = userData.filter((each:any) => each !== element);
        this.dataSource.data  = userData;
        this._snackBar.open(
          `Comment Deleted successfully`,
          "",
          {
            duration: 2000
          }
        );
        this.storageService.setVal("comments", this.dataSource.data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
  openDialog(data?): void {
    const dialogRef = this.dialog.open(CreateCommentComponent, {
      width: "250px",
      disableClose: true,
      data: { ...data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actionOnComment(result, data.id);
      }
    });
  }
  actionOnComment(result, id?) {
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
          `Comment ${id ? "Updated" : "Created"} successfully`,
          "",
          {
            duration: 2000
          }
        );
        this.storageService.setVal("comments", this.dataSource.data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
  getCommentsList() {
    this.apiService.getApi("comments").subscribe((data: any) => {
      try {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        console.log(data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }

}
