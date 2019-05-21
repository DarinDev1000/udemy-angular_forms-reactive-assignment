import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 *
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'forms-reactive-assignment';
  status = ['Stable', 'Critical', 'Finished'];
  forbiddenUserNames = ['Test', 'test'];
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required],  this.forbiddenNamesAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
