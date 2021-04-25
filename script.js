
let block__addTask = document.querySelector('.block__addTask');
let block__tasks = document.querySelector('.block__tasks');
let block__remote = document.querySelector('.block__remote');

function showBlock__addTask() {
	block__addTask.classList.remove('showHide')
	block__tasks.classList.add('showHide')
	block__remote.classList.add('showHide')
}
function showBlock__tasks() {
	block__tasks.classList.remove('showHide')
	block__addTask.classList.add('showHide')
	block__remote.classList.add('showHide')
}
function showBlock__remote() {
	block__remote.classList.remove('showHide')
	block__tasks.classList.add('showHide')
	block__addTask.classList.add('showHide')
}

    var todoList = [];
    var countSubproblemlist = 0;

    if (localStorage.getItem('todo')!=undefined){
        todoList = JSON.parse(localStorage.getItem('todo'));
        out();
    }

// отправка данных в локальную БД
    function addTask(){

            var countSubproblem = document.getElementsByClassName('txt_subproblem').length;

            if (errorControl(countSubproblem)) {
                addElement(countSubproblem);
                console.log(todoList);
                alert('Вжух')
            }else {
                alert("Неправильно введенные или незаполненные поля")
            }

    }

// Проверка на заполненность полей
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

// Добавление элемента в массив todoList последующей отправкой данных в LocalStorage
    function addElement(countSubproblem){
        var nameTask = document.getElementById('nameTask').value;
        var datetime = document.getElementById('datetime').value;
        countSubproblem = countSubproblem;
        var temp= {};
        temp.nameTask = nameTask;
        temp.check = false;
        temp.datetime ="" + new Date(datetime);
        temp.state = "not done";
        temp.subproblem ={};
        for (var i = 0; i < countSubproblem; i++ ){
            
            var subproblem = document.getElementsByClassName('input_subproblem')[i].value;
            temp.subproblem[i] = {name:subproblem,check : "false" }
        }
        var i = todoList.length;
        todoList[i] = temp;
        out();
        localStorage.setItem('todo',JSON.stringify(todoList));
    }



// Добавление поля подзадач
    function addSubproblem(){
        countSubproblemlist ++;
        document.getElementById('subproblemList').innerHTML += "<tr>" + "<td class = 'txt_subproblem'>" + countSubproblemlist+ "</td>" + "<td class = 'txt_subproblem2'>" + '<input type = "text" class = "input_subproblem" >' + "</td>" +"</tr>";
   }

// Удаление поля подзадач
    function delSubproblem(){
        if (countSubproblemlist > 0) {
            let parent =  document.querySelector('#subproblemList');
            let lastElement = parent.lastElementChild;
            lastElement.remove();
            countSubproblemlist --;
        }

    }


    function out(){
        dataPreparation()
        // var out = '';
        // for (var key in todoList){

        //     if (todoList[key].check == true){
        //         out += '<input type = "checkbox" checked>';
        //     }else{
        //         out += '<input type = "checkbox">'
        //     }
        //     out += todoList[key].nameTask + '<br>';

        // }

        // document.getElementById('out').innerHTML = out;
    }

    function polimer() {
        dataPreparation()
    }


// Подготовка данных и вывод их в окно с определенным классом
function dataPreparation(){
    var item_list =  "";
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
                item += "<li>" + '<input type="checkbox" ' + 'id = '+ todoList[key].subproblem[i].name +  'checked>'  + "</li>"
            }else{
                item += "<li>" + '<input type="checkbox" ' + 'id = '+ todoList[key].subproblem[i].name +  '>'  +'<label for=' + todoList[key].subproblem[i].name + '>' + todoList[key].subproblem[i].name +'</label>'+  "</li>"
            }
        }
        item += "</ul></div>"
        item_list += item;
    }
    document.getElementById('out1').innerHTML = item_list;
}

function help() {
    console.log(dateControl())
}

// Контроль времени на правильность ввода
function dateControl(){
    var check_error = false;
    var today = new Date();
    var todaytime = today.getHours() + ":" + today.getMinutes();
    var todaydate = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, '0') + "." + String(today.getDate()).padStart(2, '0');
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