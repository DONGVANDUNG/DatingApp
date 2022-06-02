import { MessageService } from './../_services/message.service';
import { Pagination } from './../_models/pagination';
import { Message } from './../_models/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  constructor(private messageServices: MessageService) {}

  ngOnInit(): void {
    this.loadMessage();
  }

  loadMessage() {
    this.loading = true;
    this.messageServices
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }
  deleteMessage(id: number) {
    this.messageServices.deleteMessage(id).subscribe(() => {
      this.messages.splice(
        this.messages.findIndex((m) => m.id == id),
        1
      );
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessage();
  }
}
