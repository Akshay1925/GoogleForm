import { Component,NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  questionData = []
  questionModelData = []
  questionSetJson = []
  constructor(private router: Router,private zone: NgZone) {
    if(Object.keys(history.state).length > 1){
      this.questionModelData = history.state.questionModelData
      this.questionData = history.state.questionData
    }
    var questionLength = Object.keys(this.questionModelData).length
    var json = {}
    var i = 0
    while(i < questionLength){
      json = {}
      json['question'] = (i+1)+'.'+ this.questionModelData['question'+(i+1)]['question']+'?'
      json['choice'] = this.questionModelData['question'+(i+1)]['choice']
      json['options'] = []
      Object.keys(this.questionModelData['question'+(i+1)]['options']).filter(x=>{
        json['options'].push(this.questionModelData['question'+(i+1)]['options'][x])
      })
      this.questionSetJson.push(json)
      i+=1
    }

   }

   loadBackPage(){
    this.zone.run(() => this.router.navigate([''],{'state':{'questionData':this.questionData,'questionModelData':this.questionModelData}}));
   }

  ngOnInit(): void {
  }

}
