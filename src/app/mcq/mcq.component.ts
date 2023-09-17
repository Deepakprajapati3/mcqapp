import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from '../service/questionservice.service';
import { interval } from 'rxjs'
@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {

  public name: string = "";

  public QuestionList: any = [];

  public currentQuestion: number = 0;

  public Points: number = 0;

  Counter = 60;

  correctAnswer: number = 0;

  inCorrectAnswer: number = 0;

  interval$: any;

  // progress: string = "0";

progress1 : number = 0;

isQuizCompleted :boolean = false;




  constructor(private mcqservice: QuestionserviceService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestion();
    this.startCounter();
  }

  getAllQuestion() {
    this.mcqservice.getQuestionJson().subscribe(res => { this.QuestionList = res.Questions })
  }

  nextQuestion() {
    this.currentQuestion++;

  }

  previusQuestion() {
    this.currentQuestion--;

  }
  answer(currentQno: number, option: any) {
    if(currentQno===this.QuestionList.length){
      this.isQuizCompleted=true;
      this.startCounter();
    }
    
    if (option.correct) {
      this.Points += 10;
     
    setTimeout(() => {
      this.currentQuestion++;
      this.correctAnswer++;
      this.resetCounter();
      this.pbar();
    }, 1000);

      // this.getProgressPersentage();

    }
    else {

      setTimeout(() => {
        this.currentQuestion++;
      this.inCorrectAnswer++;
      // this.getProgressPersentage();
      this.resetCounter();
      this.pbar();
 
      }, 1000);
      this.Points -= 10;
     
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.Counter--;
        if (this.Counter === 0) {
          this.currentQuestion++;
          this.Counter = 60;
          this.Points -= 10

        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 60000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.Counter = 0;

  }

  resetCounter() {
    this.stopCounter();
    this.Counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestion();
    this.Points = 0;
    this.Counter = 60;
    this.currentQuestion = 0;
    this.progress1 =0;



  }
  // getProgressPersentage() {
  //   this.progress = ((this.currentQuestion/this.QuestionList.lenght)*100).toString();
  //   return this.progress 
   
    
    
  // }
  
  
  pbar(){
    this.progress1+=9;
    // console.log(this.progress1);
    
  }

pbar1(){
this.progress1-=9;
}


}
