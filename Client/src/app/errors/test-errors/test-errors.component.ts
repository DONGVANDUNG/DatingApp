import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:7080/api/';
  validationError: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(
      (respond) => {
        console.log(respond);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-found').subscribe(
      (respond) => {
        console.log(respond);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/sever-error').subscribe(
      (respond) => {
        console.log(respond);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(
      (respond) => {
        console.log(respond);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(
      (respond) => {
        console.log(respond);
      },
      (error) => {
        console.log(error);
        this.validationError = error;
      }
    );
  }
}
