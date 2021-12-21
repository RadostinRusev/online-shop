import { Component, OnInit} from '@angular/core';
import { HttpService } from "../Shared/http.service";
import { NgForm } from '@angular/forms';
import * as mail from '@sendgrid/mail';
const API='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';
//const si = environment.API_URL

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  image =
    "https://images.freeimages.com/images/large-previews/7bc/bald-eagle-1-1400106.jpg";

  loading = false;
  buttionText = "Submit";



  constructor(public http: HttpService) {}

  ngOnInit() {
    console.log(this.http.test);
  }
  sendEmail(form:NgForm) {
    this.loading = true;
    this.buttionText = "Submiting...";
    const {name, email, message} = form.value;
  let user ={
      name:name,
      email:email,
      messagea:message
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
    form.reset();
  }
}
