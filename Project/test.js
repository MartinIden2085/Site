const questions = [
	{
		question: "1.	Зафиксированная на материальном носителе информация с реквизитами, позволяющими ее идентифицировать: ",
		answers: ["Сообщение","Документ","Текст"],
		correct: 2,
	},
	{
		question: "1.	Номенклатура продукции (услуг), подлежащей обязательной сертификации определяется Законом:",
		answers: ["О стандартизации", "О сертификации", "О защите прав потребителей"],
		correct: 2,
	},
	{
		question: "2.	За достоверность и объективность результатов,испытаний при выдаче сертификата несут ответственность:",
		answers: [
			" Испытательные лаборатории",
			" Орган по сертификации",
			" Госстандарт РФ",
		],
		correct: 1,
	},
	{
		question: "3.Форму и схему подтверждения соответствия выбирает:",
		answers: [
			"Заявитель",
			"Заказчик",
			"Органы по сертификации",
		],
		correct: 1,
	},
	{
		question: "4.ОС рассматривает заявку на проведение сертификации и сообщает заявителю о своем решении не позднее:",
		answers: ["3-х дней", "15 дней", "30 дней"],
		correct: 3,
	},
	{
		question: "5.Что понимается под сертификацией продукции?",
		answers: [
			"Совокупность участников сертификации, осуществляющих сертификацию по правилам, установленным в этой системе.",
			"Процедура подтверждения соответствия, посредством которой независимая от изготовителя (продавца, исполнителя) и потребителя (покупателя) организация удостоверяет в письменной форме, что продукция соответствует установленным требованиям.",
			"Зарегистрированный в установленном порядке знак, которым по правилам данной системы сертификации подтверждается соответствие маркированной им продукции установленным требованиям.",
		],
		correct: 2,
	},
	{
		question: "6.	Конкретную схему сертификации выбирает:",
		answers: ["Только ОС", "Только заявитель", "ОС или заявитель "],
		correct: 3,
	},
	{
		question: "7.	Форму и схему подтверждения соответствия выбирает Заказчик?",
		answers: ["Да","Нет"],
		correct: 2
	},
	{
		question: "8.Заявитель выбирает ОС:",
		answers: ["По своему усмотрению", "В соответствии с требованиями Госстандарта РФ;", "По рекомендации"],
		correct: 2,
	},
	{
		question: "9.Маркирование продукции при добровольной сертификации гарантирует:",
		answers: [
			" Только качество продукции",
			" Только безопасность продукции",
			" Качество и безопасность продукции",
		],
		correct: 3,
	},
	{
		question: "10.	Конкретную схему сертификации выбирает ОС или заявитель?",
		answers: ["Да","Нет"],
		correct: 1,
	},
	
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//Переменные викторины
let score= 0;
let questionIndex=0;



clearPage();
showQuestion();
submitBtn.onclick=checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
   listContainer.innerHTML = '';
}

function showQuestion(){
	console.log('showQuestion');


	const headerTemplate = '<h2 class="title">%title%</h2>';
	const title=headerTemplate.replace('%title%',questions[questionIndex]['question'])
	headerContainer.innerHTML= title;

	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate = 
		`<li>
		   <label>
			<input  value="%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		   </label>
	   </li>`;

		const answerHTML = questionTemplate.replace('%answer%',answerText).replace('%number%',answerNumber)

		listContainer.innerHTML += answerHTML;	
		answerNumber++;

	}


}

function checkAnswer(){
	console.log('checkAnswer started!');

	const checkedRadio= listContainer.querySelector('input:checked')

	if(!checkedRadio){
		submitBtn.blur();
		return	
	}

const userAnswer=parseInt(checkedRadio.value)
 
if(userAnswer=== questions[questionIndex]['correct']){
	score++;	
}
console.log('score =',score)

if(questionIndex !==questions.length-1){
	console.log('Это последний вопрос');
	questionIndex++;
	clearPage();
	showQuestion();
	return;
} else{
	console.log('Следующий вопрос')
	clearPage();
	showResults();
}

}

function showResults(){
	console.log('showResults started!');
	console.log(score);

	const resultsTemplate=`<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`;

	let title, message;

	if(score ===questions.length){
		title ="Поздравляем 😍";
		message ="Вы ответили верно на все вопросы 😍";

	} else if((score*100)/questions.length>=50){
		title	="Неплохой результат,но можно лучше";
		message="Хорошо"
	} else{
		title ='Стоит повторить все темы чтобы сдать тест 😢';
		message ="Плохо";
	}

	let result=`${score} из ${questions.length}`;

	const finalMessage=resultsTemplate.replace('%title%',title).replace('%message%',message).replace('%result%',result)
	headerContainer.innerHTML=finalMessage;

	submitBtn.blur();
	submitBtn.innerText="Начать заново";
	submitBtn.onclick= ()=> history.go();
}



