


//все необходимые элементы
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
// если нажата кнопка startQuiz
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //показать информационное окно
}
// если нажата кнопка exitQuiz
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //скрыть информационное поле
}

// если нажата кнопка continueQuiz
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //скрыть информационное поле
    quiz_box.classList.add("activeQuiz"); //показать поле для теста
    showQuetions(0); //вызов функции showQestions
    queCounter(1); //передача 1 параметра в queCounter
    startTimer(30); //вызов функции startTimer
    startTimerLine(0); //вызов функции startTimerLine
}
let timeValue =  30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


// если нажата кнопка  restartQuiz 
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //показать поле для теста
    result_box.classList.remove("activeResult"); //скрыть окно результатов
    timeValue = 30; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //вызов функции showQestions
    queCounter(que_numb); //передача значения que_numb в queCounter
    clearInterval(counter); //очистить счетчик
    clearInterval(counterLine); //очистить counterLine
    startTimer(timeValue); //вызов функции startTimer
    startTimerLine(widthValue); //вызов функции startTimerLine
    timeText.textContent = "Осталось"; //измените текст timeText на оставшееся время
    next_btn.classList.remove("show"); //скрыть следующую кнопку
}


// если нажать кнопку quitQuiz
quit_quiz.onclick = ()=>{
    window.location.reload(); //перезагрузите текущее окно
}
const next_btn = document.querySelector("#footer_test .next_btn");
const bottom_ques_counter = document.querySelector("#footer_test .total_que");
// если нажата кнопка Next Que
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //если количество вопросов меньше общей длины вопроса
        que_count++; //увеличьте значение que_count
        que_numb++; //увеличьте значение que_numb
        showQuetions(que_count); //вызов функции showQestions
        queCounter(que_numb); //передача значения que_numb в queCounter
        clearInterval(counter); //очистить counter
        clearInterval(counterLine); //очистить counterLine
        startTimer(timeValue); //вызов функции startTimer
        startTimerLine(widthValue); //вызов функции startTimerLine
        timeText.textContent = "Осталось"; //измените timeText на оставшееся время
        next_btn.classList.remove("show"); //скрыть следующую кнопку
    }else{
        clearInterval(counter); //очистить counter
        clearInterval(counterLine); //очистить counterLine
        showResult(); //вызов функции showResult
    }
}


// получение вопросов и вариантов из массива
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    //создание нового тега span и div для вопроса и опции и передача значения с использованием индекса массива
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //добавление нового тега span внутри que_tag
    option_list.innerHTML = option_tag; //добавление нового тега div внутри option_tag
    
    const option = option_list.querySelectorAll(".option");
    // установите атрибут onclick для всех доступных опций
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


// создание новых тегов div, которые для значков
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


//если пользователь нажал на опцию
function optionSelected(answer){
    clearInterval(counter); //очистить counter
    clearInterval(counterLine); //очистить counterLine
    let userAns = answer.textContent; //получение выбранного пользователем параметра
    let correcAns = questions[que_count].answer; //получение правильного ответа из массива
    const allOptions = option_list.children.length; //получение всех элементов опций
    
    if(userAns == correcAns){ //если выбранный пользователем вариант равен правильному ответу массива
        userScore += 1; //повышение значения балла на 1
        answer.classList.add("correct"); //добавление зеленого цвета к правильному выбранному варианту
        answer.insertAdjacentHTML("beforeend", tickIconTag); //добавление значка галочки к правильному выбранному варианту
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //добавление красного цвета к правильному выбранному варианту
        answer.insertAdjacentHTML("beforeend", crossIconTag); //добавление значка креста к правильному выбранному варианту
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //если есть вариант, который сопоставляется с массивом, ответьте
                option_list.children[i].setAttribute("class", "option correct"); //добавление зеленого цвета к соответствующему варианту
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //добавление значка галочки к соответствующему варианту
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //как только пользователь выбирает опцию, затем отключает все опции
    }
    next_btn.classList.add("show"); //показывать кнопку далее, если пользователь выбрал какой-либо вариант
}


function showResult(){
    info_box.classList.remove("activeInfo"); //скрыть информационное поле
    quiz_box.classList.remove("activeQuiz"); //скрыть окно теста
    result_box.classList.add("activeResult"); //показать окно результатов
    const scoreText = result_box.querySelector(".score_text");
    if (userScore === 10){ // если пользователь набрал более 3 баллов
        //создание нового тега span и передача номера оценки пользователя и общего номера вопроса
        let scoreTag = '<span> Идеально! Поздравляем!  <p> ' + userScore + ' </p> из <p> ' + questions.length +' </p></span>';
        scoreText.innerHTML = scoreTag;  //добавление нового тега span внутри score_Text
    }
    else if(userScore > 6){ 
        let scoreTag = '<span> Вы молодец!  <p> ' + userScore +' </p> из <p> '+ questions.length +' </p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 4){ 
        let scoreTag = '<span>Вам следует лучше изучить тему.   <p> '+ userScore +' </p> из <p> '+ questions.length +'</p></span>';
        /*let scoreTag = '<span>Вам стоит лучше изучить наши статьи по этой теме. У вас <p> '+ userScore +' </p> из <p> '+ questions.length +'</p></span>'; */
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>Очень жаль.  <p> ' + userScore + ' </p> из <p> '+ questions.length +'</p></span>';
        /*let scoreTag = '<span>Очень жаль. Вы не читали наши статьи по этой теме или читали невнимательно, либо нажимали наугад и вам неповезло. У вас <p>'+ userScore +' </p> из <p> '+ questions.length +'</p></span>';*/
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //изменение значения timeCount на значение time
        time--; //уменьшите значение времени
        if(time < 9){ //если значение таймера меньше 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //добавление 0 перед значением времени
        }
        if(time < 0){ //если значение таймера меньше 0
            clearInterval(counter); //очищенее counter
            timeText.textContent = "Время вышло"; //измените текст времени на время отключения
            const allOptions = option_list.children.length; //получение всех элементов опций
            let correcAns = questions[que_count].answer; //получение правильного ответа из массива
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //если есть вариант, который сопоставляется с массивом, ответьте
                    option_list.children[i].setAttribute("class", "option correct"); //добавление зеленого цвета к соответствующему варианту
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    //добавление значка галочки к соответствующему варианту
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //как только пользователь выбирает опцию, затем отключает все опции
            }
            next_btn.classList.add("show"); //показывать кнопку далее, если пользователь выбрал какой-либо вариант
        }
    }
}


function startTimerLine(time){
    counterLine = setInterval(timer, 56);
    function timer(){
        time += 1; //значение времени обновления на 1
        time_line.style.width = time + "px"; // увеличение ширины time_line с px на значение времени
        if(time > 549){ //если значение времени больше 549
            clearInterval(counterLine); //очистить counterLine
        }
    }
}
function queCounter(index){
    //создание нового тега span и передача номера вопроса и общего количества вопросов
    let totalQueCounTag = '<span><p>'+ index +'</p> / <p>'+ questions.length;
    bottom_ques_counter.innerHTML = totalQueCounTag;  //добавление нового тега span внутри bottom_ques_counter
}


