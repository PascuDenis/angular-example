import { Component, OnInit } from '@angular/core';
import { Participant } from '../participant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  participants: Participant[];
  id: number;
  name: string;
  age: number;
  error = false;
  errorMessage = '';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

    this.loadParticipants();
  }

  loadParticipants() {
    this.http.get('http://localhost:8080/root', this.httpOptions).subscribe((response) => {
      this.participants = response as Participant[];
    }, (error) => {
      console.log(error);
    });
  }

  /* MERGE */
  public adaugaParticipant() {
    const participant = new Participant();
    participant.id = this.id;
    participant.name = this.name;
    participant.age = this.age;
    this.http.post<Participant>('http://localhost:8080/root/addParticipant', participant).subscribe((response) => {
      this.error = false;
      this.loadParticipants();
    }, (error1) => {
      this.error = true;
      this.errorMessage = error1.error.message;
      console.log(error1);
    });
  }

  public stergereParticipant(){
    var participantId = this.id;
    console.log(this.id);
    console.log(participantId);
    this.http.delete("http://localhost:8080/root/deleteParticipant/" + this.id).subscribe((response) => {
      this.error = false;
      this.loadParticipants();
    }, (error1) => {
      this.error = true;
      this.errorMessage = error1.error.message;
      console.log(error1);
    });
  }
  
  public updateParticipant() {
    const participant = new Participant();
    participant.id = this.id;
    participant.name = this.name;
    participant.age = this.age;
    this.http.put('http://localhost:8080/root/updateParticipant/' + this.id, participant).
    subscribe((response) => {
      this.error = false;
      this.loadParticipants();
    }, (error1) => {
      this.error = true;
      this.errorMessage = error1.error.message;
      console.log(error1);
    });
  }  
}
