import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User, ApiPage } from '../../../model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  maxDate = new Date(new Date());
  minDate = new Date(2018, 8, 1);
  date = '';
  email = '';
  name = '';
  mobile = '';
  users: User[];
  isLoading = true;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'mobile',
    'addedDate'
  ];

  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.getUsersList({ pageSize: this.pageSize, pageNo: this.pageIndex });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  reset() {
    this.name = '';
    this.mobile = '';
    this.date = '';
    this.email = '';
    this.usersList();
  }


  usersList = () => {
    this.isLoading = true;
    this.getUsersList({
      pageSize: this.pageSize,
      pageNo: this.pageIndex,
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      createdAt: this.date,
    });
  }

  downloadCsv = () => {
    this.isLoading = true;
    this.userService.downloadCsv()
      .subscribe((data) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = 'users.csv';
        document.body.appendChild(a);
        a.click();
        this.isLoading = false;
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      });
  }

  getUsersList = filters => {
    this.userService.list(filters).subscribe(
      (users: ApiPage) => {
        this.pageSize = users.pageSize;
        this.total = users.total;
        this.pageIndex = users.pageNo - 1;
        this.users = users.items;
        this.isLoading = false;
        if (this.users && !this.users.length) {
          this.toastrService.info('No Records Found', '', { timeOut: 3000 });
        }
      },
      err => {
      }
    );
  }

  handlePage(e: any) {
    const pageNoIncrement = e.pageIndex;
    this.getUsersList({ pageSize: e.pageSize, pageNo: pageNoIncrement + 1 });
  }
}
