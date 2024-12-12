// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formData = {
    email: '',
    template: ''
  };

  templates = [
    'Template 1: Job Application',
    'Template 2: Follow-up Email',
    'Template 3: Thank You Note'
  ];

  onSubmit() {
    const { email, template } = this.formData;

    if (email && template) {
      alert(`Email sent successfully to ${email} with the template: ${template}`);
      // Here you would integrate with a backend API to send the actual email.
    } else {
      alert('Please fill out all fields.');
    }
  }
}
