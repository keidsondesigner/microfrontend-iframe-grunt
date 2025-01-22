import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// interface AppConfig {
//   theme: string;
//   apiUrl: string;
//   features: {
//     darkMode: boolean;
//     notifications: boolean;
//   };
//   user: {
//     id: number;
//     name: string;
//     role: string;
//   };
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div style="padding: 20px;">
      <h1>Angular Microfrontend</h1>
      <p>This is the Angular application running in an iframe.</p>
      <button (click)="updateTheme('light')">Set Light Theme</button>
      <button (click)="updateTheme('dark')">Set Dark Theme</button>
      <!-- <button (click)="sendMessage()">Send Message to Parent</button> -->
      <div *ngIf="config">
        <h3>Received Configuration:</h3>
        <pre>{{ config | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px; /* Add some space between buttons */
    }
    button:hover {
      background-color: #0056b3;
    }
    pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      overflow: auto;
    }
  `]
})
export class AppComponent implements OnInit {
  //config: AppConfig | null = null;
  config: any | null = null;

  ngOnInit() {
    // Escuta a "config" do pai
    window.addEventListener('message', (event) => {
      if (event.data.type === 'config') {
        this.config = event.data.data;
        console.log('Received configuration in Angular:', this.config);
      }
    });
  }
  
  updateTheme(newTheme: string) {
    console.log("acionando updateTheme() no Angular");
    // Atualiza a configuração localmente
    this.config.theme = newTheme; // Atualiza o tema na configuração

    // Envia a nova configuração para o pai
    window.parent.postMessage({
      type: 'dipararUpdateTheme', // identificador que dispara a função
      newTheme: newTheme, // envia dados passado pelos parametros
      updatedConfig: this.config // envia a configuração atualizada
    }, '*');
  }

  // sendMessage() {
  //   window.parent.postMessage('Hello from Angular!', '*');
  // }
}