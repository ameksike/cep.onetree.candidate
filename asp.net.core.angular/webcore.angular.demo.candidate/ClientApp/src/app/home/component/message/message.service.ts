/*
 * @author		  Antonio Membrides Espinosa
 * @email    	  tonykssa@gmail.com
 * @date		    10/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
import { Injectable } from '@angular/core';
import { MessageModel, MessageType } from './message.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class MessageService {

  subject : Subject<MessageModel>;

  constructor() { 
    this.subject  = new Subject<MessageModel>(); 
  }

  addMsg(message:MessageModel ){
    this.subject.next(message);
  }

  add(message: string, title: string, style: string, type: MessageType = MessageType.Custom){
    if(message ===  '' || message === null || message === undefined){
      return;
    }
    this.subject.next( new MessageModel({ 
      'content':message, 
      'type': type,
      'style': style,
      'title' : title 
    }));
  }

  get(): Observable<MessageModel>{
    return this.subject.asObservable();
  }

  clean(){
    this.subject.next();
  }

  success(message: string, title: string='', style: string=''){
    this.add(message, title, style, MessageType.Success);
  }
  error(message: string, title: string='', style: string=''){
    this.add(message, title, style, MessageType.Error);
  }
  info(message: string, title: string='', style: string=''){
    this.add(message, title, style, MessageType.Info);
  }
  warning(message: string, title: string='', style: string=''){
    this.add(message, title, style, MessageType.Warning);
  }
  custom(message: string, title: string='', style: string=''){
    this.add(message, title, style, MessageType.Custom);
  }
}
