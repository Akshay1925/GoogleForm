import { Component, OnInit,NgZone } from '@angular/core';
import { NgModule } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-google-form',
  templateUrl: './google-form.component.html',
  styleUrls: ['./google-form.component.scss']
})
export class GoogleFormComponent implements OnInit {
  constructor(private router: Router,private zone: NgZone) {
    if(Object.keys(history.state).length > 1){
      this.questionSetModelList = history.state.questionModelData
      this.questionContent = history.state.questionData
    }
      
   }

  ngOnInit(): void {
  }

  questionSetModelList = {'question1':{'choice':'CheckBox','question':'','options':{}}}

  questionContent = [
    {"id":"question1","content":"Question1","highlightDiv":true,"optionContent":[
      {"id":"question1_option1","choiceSet":{"CheckBox":true,"Radio":false,"DropDown":false}}
    ]}
  ]

  loadPreviewPage(){
    this.zone.run(() => this.router.navigate(['preview'],{'state':{'questionData':this.questionContent,'questionModelData':this.questionSetModelList}}));
  }

  selectOptionChoice(index){
      var i =0;
      this.questionContent.filter(x=>{
        if(i == index){
          var optionIndex = 0;
          this.questionContent[index]['optionContent'].filter(y=>{
            Object.keys(y['choiceSet']).filter(z=>{
              if(z == this.questionSetModelList['question'+(index + 1)]['choice']){
                this.questionContent[index]['optionContent'][optionIndex]['choiceSet'][z] = true
               }else{
                this.questionContent[index]['optionContent'][optionIndex]['choiceSet'][z] = false
               }
              
            })
            optionIndex+=1
          })
        }
        i+=1
      })
  }

  deleteOption(questionIndex,optionIndex){
    var i =0;
      this.questionContent.filter(x=>{
        if(i == questionIndex){
          var j = 0;
          this.questionContent[questionIndex]['optionContent'].filter(y=>{
            if(j == optionIndex){
              this.questionContent[questionIndex]['optionContent'].splice(j,1)
            }
            j+=1
          })
        }
        i+=1
      })
  }

  addOptionItem(questionID,index){
    var optionJson = {'id':questionID+'_option' + (this.questionContent[index]['optionContent'].length + 1) .toString() ,"choiceSet":{"CheckBox":true,"Radio":false,"DropDown":false}}
    Object.keys(optionJson.choiceSet).filter(x=>{
      if(x == this.questionSetModelList['question'+(index + 1)]['choice']){
        optionJson['choiceSet'][x] = true
       }else{
        optionJson['choiceSet'][x] = false
       }
    })
    this.questionContent[index]['optionContent'].push(optionJson)

  }

  selectDivQuestion(index){
    var i = 0
    this.questionContent.filter(x=>{
      if(index == i){
        x['highlightDiv'] = true
      }else{
        x['highlightDiv'] = false
      }
      i+=1
    })
  }

  resetHighlightedForm(){
    this.questionContent.filter(x=>{
        x['highlightDiv'] = false
    })
  }

  addQuestion(){
    this.resetHighlightedForm()
    var formJson = {'id':'question' + (this.questionContent.length + 1) .toString() ,'content':'Question' + (this.questionContent.length + 1).toString(),'highlightDiv':true,
    "optionContent":[{"id":'question'+ (this.questionContent.length + 1) .toString()+'_option1',"choiceSet":{"CheckBox":true,"Radio":false,"DropDown":false}}]}
    this.questionContent.push(formJson)
    this.questionSetModelList['question'+this.questionContent.length.toString()] = {}
    this.questionSetModelList['question'+this.questionContent.length.toString()]['choice'] = 'CheckBox'
    this.questionSetModelList['question'+this.questionContent.length.toString()]['question'] = ''
    this.questionSetModelList['question'+this.questionContent.length.toString()]['options'] = {}
  }
}
