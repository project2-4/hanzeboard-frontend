import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Dit is een footer d
        </p>
      </div>
    </div>
  </footer>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor() { }

}
