import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'url-shortner';
  inputValue: string = '';
  shortCode: string = ''; // Define shortCode property
  shortUrl: string = '';
  originalUrl!: string;
  @ViewChild('shortUrlInput') shortUrlInput!: ElementRef<HTMLInputElement>;

  constructor(private clipboardService: ClipboardService, private http: HttpClient) {
    this.inputValue = '';
  }



  onCopySuccess() {
    console.log('Copy success');
  }
  
  onCopyError() {
    console.error('Copy error');
  }
  
  onPaste(inputElement: HTMLInputElement) {
    navigator.clipboard.readText().then((clipboardData) => {
      if (clipboardData) {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (regex.test(clipboardData)) {
          inputElement.value = clipboardData.toString();
          this.inputValue = clipboardData.toString();
        }
      }
    });
  }


  copyInputValue(inputElement: HTMLInputElement) {
    inputElement.select();
    document.execCommand('copy');
  }
  onSubmit() {
    const url = 'http://192.168.76.238:8000/shorten';
    const data = { url: this.inputValue };
console.log(data);
    this.http.post(url, data).subscribe(
      (response: any) => {
        this.shortCode = response.short; 
        this.shortUrl = 'http://192.168.185.238:8000/' + this.shortCode;
      },
      error => console.error(error)
    );
  }

  
}
