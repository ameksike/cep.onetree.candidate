/*
 * @author		  Antonio Membrides Espinosa
 * @email    	  tonykssa@gmail.com
 * @date		    10/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageModel, MessageType } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  model: MessageModel[];
  subscription: Subscription;

  constructor(private srvMessages: MessageService) { 
    this.model = [];
  }

  ngOnInit() {
    this.subscription = this.srvMessages.get().subscribe( message => {
      if (message) {
        this.model.push(message);
      } else {
        this.model = [];
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  remove(target){
    this.model = this.model.filter(x => x !== target);
  }
  
  style(target){
    if (!target) {
        return;
    }

    switch (target.type) {
        case MessageType.Success:
            return 'alert alert-success';
        case MessageType.Error:
            return 'alert alert-danger';
        case MessageType.Info:
            return 'alert alert-info';
        case MessageType.Warning:
            return 'alert alert-warning';
        case MessageType.Warning:
            return 'alert alert-warning';
    }
  }
}
