const questions = {
    "teilAllgemein": [
        {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]},
        {"a":"Wie heißt die Hauptstadt der Slowakei?", "l": ["Sofia","Prag","Bratislava","Ljubljan"]},
        {"a":"Wie viele Zähne hat ein erwachsener Mensch normalerweise?", "l": ["32","30","26","36"]},
        {"a":"Wer wählt den Bundespräsidenten?", "l": ["Bundesversammlung","Bundestag","Bundesrat","Bundeskanzler"]},
        {"a":"Wie heißt die Hauptstadt von Thüringen?", "l": ["Erfurt","Magdeburg","Dresden","Potsdam"]},
        {"a":"Wie viele Planeten hat unser Sonnensystem?", "l": ["8","9","10","11"]},
        {"a":"Wer verbreitete das heliozentrische Weltbild?", "l": ["Nikolaus Kopernikus","Galileo Galilei","Leonardo da Vinci","Aristoteles"]},
        {"a":"An welchem Tag fiel die Berliner Mauer?", "l": ["9. November 1989","2. November 1990","3. Oktober 1990","8. Oktober 1989"]},
        {"a":"Wie heißt die Schicht der Atmossphäre, die der Erde am nächsten ist?", "l": ["Stratosphäre","Troposphäre","Mesosphäre","Thermosphäre"]},
        {"a":"Wie viele Monde hat der Planet Mars?", "l": ["2","8","4","14"]},
    ]
}


const choice_text = document.getElementsByClassName("choice-text");
const question = document.getElementById("questions");
const choice_prefix = document.getElementsByClassName("choice-prefix");
const progress_bar = document.getElementsByClassName("progressbar");
const quiz_container = document.getElementsByClassName("quiz_container");

let button_id;
let currentQuestion = 0;
let progressbar_width = 0;
let anzahl_richtig = 0;
let questions_normal = JSON.parse(JSON.stringify(questions));
let category;
let answers_passend;
let shuffledQuestions;

function category_teilAllgemein(){
    category = "'teilAllgemein'";
    console.log(category);
}



console.log(questions);


function startGeneral() {
    
    //console.log(shuffledQuestions);
    //######################################Aufgaben durchmischen####################################################
    shuffledQuestions = questions[category].sort(() => Math.random() - .5);

    //Objekt mit geshuffelten Fragen kopieren, damit die Antworten passend zur Frage kommen aber die Antwort noch an 1. Stelle steht
    answers_passend = JSON.parse(JSON.stringify(questions));

    console.log(answers_passend);
    console.log(questions_normal);

    getnewQuestion();

    //###########################Start Button verschwinden lassen##################################################
    let start_button = document.getElementById("button");
    start_button.classList.add("hidden");

    //###################mverstecktes Quiz anzeigen lassen (Klasse "hidden" entfernen)#############################
    for (let i = 0; i < choice_text.length; i++) {
        choice_text[i].classList.remove("hidden");
    }

    for (let i = 0; i < choice_prefix.length; i++) {
        choice_prefix[i].classList.remove("hidden");
    }

    for (let i = 0; i < progress_bar.length; i++) {
        progress_bar[i].classList.remove("hidden");
    }
}

function getnewQuestion()
{
    if(currentQuestion == 10) {
        end_screen();
    }
    //######################################Antworten durchmischen ##################################################
    shuffledAnswers = questions[category][currentQuestion].l.sort(() => Math.random() - .5);
    console.log(shuffledAnswers); 
    console.log(answers_passend);

    //#######################################Frage einfügen#######################################################
    question.innerHTML = questions[category][currentQuestion].a;


    //Antworten einfügen
    for (let i = 0; i < choice_text.length; i++) {
        choice_text[i].innerHTML = questions[category][currentQuestion].l[i];
    }

    currentQuestion += 1;
    console.log(currentQuestion);
}


function getColor_right(element){
    element.setAttribute('style','background-color: green')
    setTimeout(function(){
        getnewQuestion();
        element.style.backgroundColor = 'white';
    }, 500);
}

function getColor_false(element){
    element.setAttribute('style','background-color: red')
    setTimeout(function(){
        getnewQuestion();
        element.style.backgroundColor = 'white';
    }, 500);
}

function check_answer(element){

    var text = element.querySelectorAll(".choice-text");

    var progressbar = document.getElementById("inner_progressbar");

    if(text[0].textContent == answers_passend[category][currentQuestion-1].l[0]){
        console.log("richtig");
        getColor_right(element);
        progressbar_width += 20;
        progressbar.style.width = progressbar_width + "px";
        anzahl_richtig += 1;

    } else {
        console.log("falsch");
        getColor_false(element);
    }

    console.log(text[0].textContent);
    console.log(answers_passend[category][currentQuestion-1].l[0]);
}

    //EventListener der scahut welcher Button gedrückt wurde
    const buttons = document.querySelectorAll('.choice-container');

    buttons.forEach(button => {
        button.addEventListener('click', function handleClick(event){
            console.log('button clicked', event);

            button_id = button.id;

            console.log(button);
            check_answer(button);

            
        });
    });

    function end_screen(){
        //###################mverstecktes Quiz anzeigen lassen (Klasse "hidden" entfernen)#############################
        for (let i = 0; i < choice_text.length; i++) {
            choice_text[i].classList.add("hidden");
        }

        for (let i = 0; i < choice_prefix.length; i++) {
            choice_prefix[i].classList.add("hidden");
        }

        //question.classList.add("hidden");

        question.innerHTML = "Sie haben " + anzahl_richtig + " von 10 Fragen richtig beantwortet."

    }