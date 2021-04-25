
// Показ и скрывание окон
let block__addTask = document.querySelector('.block__addTask');
let block__tasks = document.querySelector('.block__tasks');
let block__remote = document.querySelector('.block__remote');

// Показать блок ДОБАВЛЕНИЯ ЗАДАЧИ
function showBlock__addTask() {
	block__addTask.classList.remove('showHide') 
	block__tasks.classList.add('showHide')
	block__remote.classList.add('showHide')
}

// Показать блок со списком задач
function showBlock__tasks() {
	block__tasks.classList.remove('showHide')
	block__addTask.classList.add('showHide')
	block__remote.classList.add('showHide')

}

// Показать Выполненные задачи
function showBlock__remote() {
	block__remote.classList.remove('showHide')
	block__tasks.classList.add('showHide')
	block__addTask.classList.add('showHide')
}
// Показ и скрывание окон END

var todoList = [];	// Создаем список Задач
var countSubproblemlist = 0;	

if (localStorage.getItem('todo')!=undefined){ //Смотрим есть ли задачи в локалке если да то выводим
    todoList = JSON.parse(localStorage.getItem('todo')); 
    out();
}

// Добавление Задачи
function addTask(){
   var countSubproblem = document.getElementsByClassName('txt_subproblem').length;

   if (errorControl(countSubproblem)) {
      addElement(countSubproblem);
      console.log(todoList);
      alert('Вжух')
   }else{
      alert("Неправильно введенные или незаполненные поля")
   }

}

//  Добавлнение задачи в локал стораж
function addElement(countSubproblem){
// Получаем значения с полей 
	var nameTask = $(".nameTask").val()
	var datetime = $(".datetime").val()

   countSubproblem = countSubproblem;

   // Создаем структуру данных
   var temp= {};
   temp.nameTask = nameTask;
   temp.check = false;
   temp.datetime ="" + new Date(datetime);	//дату переводим в строковый тип для сохранения в локалку
   temp.state = "not done";
   temp.subproblem ={};

   // Смотрим сколько строк подзадач (inputov) бежим по списку и считываем данные
   for (var i = 0; i < countSubproblem; i++ ){

      var subproblem =	$('.input_subproblem')[i].value;

      temp.subproblem[i] = {name:subproblem,check : "false" }

   }

   var i = todoList.length;
   todoList[i] = temp;
   out();
   localStorage.setItem('todo',JSON.stringify(todoList));
}



// Работа с полями подзадач
// Добавление полей подзадач
$('.btn_addSubproblem').click(function () {
	countSubproblemlist ++;
	$('#subproblemList').append("<tr>" + "<td class = 'txt_subproblem'>" + countSubproblemlist+ "</td>" + "<td class = 'txt_subproblem2'>" + '<input type = "text" class = "input_subproblem" >' + "</td>" +"</tr>");
});
// Удаление поля подзадачи
$('.btn_delSubproblem').click(function () {
   if (countSubproblemlist > 0) {
   	$("tr").last().remove();
      countSubproblemlist --;
   }
});
// Работа с полями подзадач END

// Подготовка данных и вывод их в окно с определенным классом
function out(){
	// Создаем Список задач
   var item_list =  "";

   // Условие на отображение даты
   var today = new Date();
   var checkTrue   = '<input type="checkbox" checked>';
   var checkFalse  = '<input type="checkbox">';
   var timeToExecution ="Просрочено"

   for (var key in todoList){
      var countDay = Math.round((new Date(todoList[key].datetime) - today) /1000/60/60/24)

      if (countDay == 0) {
         timeToExecution = " сегодня";

      }else if (countDay == 1) {
         timeToExecution = " завтра";

      }else if (countDay == 2) {
         timeToExecution = " послезавтра";

      }else if (countDay > 2) {
         timeToExecution =" через "+ countDay + " дней";

      }else {
      	timeToExecution = "";
      }
      var item  = '<div class="item"><p class="title">' + todoList[key].nameTask  + timeToExecution +'</p><ul>'

      for (i in todoList[key].subproblem) {
         if (todoList[key].subproblem[i].chek == "true") {
            item += "<li>" + '<input type="checkbox"'+'value =' + todoList[key].subproblem[i].name + ' id = '+ todoList[key].subproblem[i].name +  'checked>'  + "</li>"
         }else{
            item += "<li>" + '<input type="checkbox"' +'value =' + todoList[key].subproblem[i].name  + ' id = '+ todoList[key].subproblem[i].name +  '>'  +'<label for=' + todoList[key].subproblem[i].name + '>' + todoList[key].subproblem[i].name +'</label>'+  "</li>"
         }
      }

   	item += "</ul></div>"
   	// Добавление задач в список активных задач 
   	item_list += item;
   	// Вывод списка задач
		$('#out').append(item_list);
   }
}

// Контроль времени на правильность ввода
function dateControl(){

   var check_error = false;
   var today = new Date();
   // Создаем переменные с сегодняшней датой
   var todaytime = today.getHours() + ":" + today.getMinutes();
   var todaydate = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, '0') + "." + String(today.getDate()).padStart(2, '0');

   // Считываем данные с поля ввода datetime-local
   let input_datetime = new Date(document.getElementById('datetime').value);
   let dateinput = input_datetime.getFullYear() + "." + String(input_datetime.getMonth() + 1).padStart(2, '0') + "." + String(input_datetime.getDate()).padStart(2, '0');
   let timeinput = input_datetime.getHours() + ":" + input_datetime.getMinutes();

   if (document.getElementById('datetime').value != "" ) {
      if (dateinput == todaydate && todaytime < timeinput) {
          check_error = true;
      }else if (dateinput > todaydate) {
          check_error = true;
      }
   }
   return check_error;
}

function errorControl(countSubproblemlist){
   var nameTask = document.getElementById('nameTask').value;
   var countSubproblemlist = countSubproblemlist;
   var check_error = true;
   if (nameTask === "") {
       check_error = false;
   }else if (countSubproblemlist > 0) {
      for (var i = 0; i < countSubproblemlist; i++ ){
        var subproblem = document.getElementsByClassName('input_subproblem')[i].value;
        if (subproblem == "") {
            check_error = false;
        }
      }
   }else {
      check_error = true;
   }
   if (dateControl() && check_error == true) {
      check_error = true;
   }
   return check_error;
}