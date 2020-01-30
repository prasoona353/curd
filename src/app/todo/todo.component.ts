import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { ApiserviceService } from '../services/apiservice.service';
import { StorageService } from '../services/storageservice';
import { CreateTodoComponent } from '../modals/create-todo/create-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  displayedColumns: string[] = [
   "title",
   "status",
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
    if (this.storageService.select("todos")) {
      this.dataSource.data = this.storageService.select("todos");
      this.dataSource.paginator = this.paginator;
    } else {
      this.getTodoList();
    }
  }
  deleteTodo(element) {
    this.apiService.delete(`todos/${element.id}`).subscribe((data: any) => {
      try {
        let todoData = this.dataSource.data;
        todoData = todoData.filter((each:any) => each !== element);
        this.dataSource.data  = todoData;
        this._snackBar.open(
          `Todo Deleted successfully`,
          "",
          {
            duration: 2000
          }
        );
        this.storageService.setVal("todos", this.dataSource.data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
  openDialog(data?): void {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: "500px",
      disableClose: true,
      data: { ...data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actionOnTodo(result, data ?data.id : '');
      }
    });
  }
  actionOnTodo(result, id? ,status?) {
    console.log(status)
    const url = id ? `todos/${id}` : "todos";
    const method = id ? "put" : "post";
    this.apiService[method](url, { ...result }).subscribe((data: any) => {
      data.completed = status ? !data.completed : data.completed
      try {
        const createdTodoData = this.dataSource.data;
        if (id) {
          createdTodoData[id - 1] = data;
        } else {
          createdTodoData.unshift(data);
        }
        this.dataSource.data = createdTodoData;
        this.dataSource.paginator = this.paginator;
        this._snackBar.open(
          `Todo ${id ? "Updated" : "Created"} successfully`,
          "",
          {
            duration: 2000
          }
        );
        this.storageService.setVal("todos", this.dataSource.data);
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
  getTodoList() {
    this.apiService.getApi("todos").subscribe((data: any) => {
      try {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      } catch (e) {
        console.log(e, "error");
      }
    });
  }
}
