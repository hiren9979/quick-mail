import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Template {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailForm: FormGroup;
  templates: Template[] = [];
  selectedTemplateContent: { subject: string, body: string } | null = null;
  isLoading = false;
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      template: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.http.get<Template[]>(`${this.apiUrl}/templates`).subscribe({
      next: (templates) => {
        console.log(templates);
        this.templates = templates;
      },
      error: (error) => {
        console.error('Error loading templates:', error);
        this.snackBar.open('Failed to load templates', 'Close', {
          duration: 3000
        });
      }
    });
  }


  onSubmit(): void {
    if (this.emailForm.valid) {
      this.isLoading = true;
      
      const emailData = {
        to: this.emailForm.value.email,
        templateId: this.emailForm.value.template
      };

      this.http.post(`${this.apiUrl}/send-email`, emailData).subscribe({
        next: (response) => {
          this.snackBar.open('Email sent successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.emailForm.reset();
          this.selectedTemplateContent = null;
        },
        error: (error) => {
          console.error('Error sending email:', error);
          this.snackBar.open('Failed to send email. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
