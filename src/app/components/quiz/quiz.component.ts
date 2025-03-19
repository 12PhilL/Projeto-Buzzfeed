import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quiz_questions from "../../../app/assets/data/quiz_questions.json"

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  title: string = '';

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit() {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

   async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
  }else{
    const finalAnswer:string = await this.checkResult(this.answers)
    this.finished = true
    this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previus, current, i, arr) => {
      if(
        arr.filter(item => item == previus).length >
        arr.filter(item => item == current).length
      ){
        return previus
      }else{
        return current
      }
    })
    return result
  }
}
