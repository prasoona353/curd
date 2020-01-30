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
  openDialog(data?, index?): void {
    const dialogRef = this.dialog.open(CreateCommentComponent, {
      width: "500px",
      disableClose: true,
      data: { ...data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actionOnComment(result, index);
      }
    });
  }
  actionOnComment(result, index?) {
    console.log(result, index, 'qqqqqqqq')

    const url = result.id ? `comments/${result.id}` : "comments";
    const method = result.id ? "put" : "post";
    this.apiService[method](url, { ...result }).subscribe((data: any) => {
      try {
        const createdCommentData = this.dataSource.data;
        if (result.id) {
          createdCommentData[index] = data;
        } else {
          createdCommentData.unshift(data);
        }
        this.dataSource.data = createdCommentData;
        this.dataSource.paginator = this.paginator;
        this._snackBar.open(
          `Comment ${result.id ? "Updated" : "Created"} successfully`,
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
        
        this.dataSource.data = data.reverse();
        this.dataSource.paginator = this.paginator;
        console.log(data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }

}
