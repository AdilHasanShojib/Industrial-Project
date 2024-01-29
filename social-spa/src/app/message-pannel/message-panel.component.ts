import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Messages } from '../_models/messages';
import { Pagination } from '../_models/pagination';
import { MatTableDataSource} from '@angular/material/table'
import { MessagesService } from '../_services/messages.service';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.css']
})
export class MessagePanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string [] = ['messages', 'fromTo', 'sentReceived', 'action' ];
  dataSource: MatTableDataSource<Messages>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  messages?: Messages[];
  container = 'Unread';
  pagination?: Pagination;
  pageNumber = 1 ;
  pageSize= 5;
  loading = false;
  constructor(private messageService: MessagesService, private router: Router){
    this.dataSource = new MatTableDataSource<Messages> ();
  }
  ngOnInit(): void {
  //  this.loadMessages('Unread');
  }
  ngAfterViewInit(): void {
   if(this.paginator) {
    this.dataSource.paginator = this.paginator;
   }
  }
  loadMessages( container: string) {
    this.loading = true;
    this.container = container;

    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
        next: (res) => {
          this.messages = res.result;
          if(this.dataSource){
            this.dataSource = new MatTableDataSource<Messages>(this.messages)
          }
          this.pagination = res.pagination;
          this.loading = false;
        }
    })
  }
  pageChanged(event: any) {
   this.pageNumber = event.pageIndex + 1;
   this.pageSize = event.pageSize;
   this.loadMessages(this.container);
  }
  
  deleteMessage(id: number) {
    console.log(this.messages);
    this.messageService.deleteMessage(id).subscribe({
      next: () => { 
        this.dataSource.data?.forEach((element) => {
          console.log(element);
          if(element.id === id) {
            if(this.dataSource) {
              this.dataSource.data.splice(this.dataSource.data.findIndex((x)=> x === element), 1);
              this.dataSource = new MatTableDataSource<Messages>(this.dataSource.data);
            }
          }
        }) 
      }
    })
  }
  navigate(row: Messages, $event: any) {
    let username =  '';
    if(this.container === 'Outbox') {
      username = row.recipientUsername;
    } else {
      username = row.senderUsername;
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {tab: 'Messages'}
    };
    this.router.navigate(['/member/' + username], navigationExtras);
  }

}
