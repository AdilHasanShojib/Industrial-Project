import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-message-pannel',
  templateUrl: './message-pannel.component.html',
  styleUrls: ['./message-pannel.component.css']
})
export class MessagePannelComponent implements OnInit, AfterViewInit {
  displayedColumns: string []=['messages','female','sentReceived','action'];
  dataSource:MatTableDataSource<Messages>;
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  
  
  constructor(){

  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  deleteMessage(id:number){



    
  }





}
