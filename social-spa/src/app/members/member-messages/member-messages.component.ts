import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Messages } from 'src/app/_models/messages';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;  
  @Input() username?: string;
  @Input() messages: Messages[] = [];
  messageContent = '';
  loading = false;
  constructor(public messagesService: MessagesService) {}

  ngOnInit(): void {
    // this.loadMessages();
  }
  // loadMessages( ) {
  //   if(!this.username) return;

  //   this.messagesService.getMessagesThread(this.username).subscribe({
  //       next: (res) => this.messages = res
  //   })
  // }
  sendMessage() {
    if(!this.username) return;
    this.loading = true;
    this.messagesService.sendMessage(this.username, this.messageContent).subscribe({
        next: (res) => {
            this.messages.push(res);
            this.messageForm?.reset();
            this.loading = false;
        }
    })
  }
}
