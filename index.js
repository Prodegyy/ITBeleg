const questions = {
    "teilAllgemein": [
        {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]},
        {"a":"Wie heißt die Hauptstadt der Slowakei?", "l": ["Sofia","Prag","Bratislava","Ljubljan"]},
        {"a":"Wie viele Zähne hat ein erwachsener Mensch normalerweise?", "l": ["26","30","32","36"]},
        {"a":"Wer wählt den Bundespräsidenten?", "l": ["Bundeskanzler","Bundestag","Bundesrat","Bundesversammlung"]}
    ]
}

const choice_text = document.getElementsByClassName("choice-text");

let button_id;
let currentQuestion = 0;

let questions_normal = JSON.parse(JSON.stringify(questions));

console.log(questions);


//######################################Aufgaben durchmischen####################################################
let shuffledQuestions = questions["teilAllgemein"].sort(() => Math.random() - .5);

console.log(questions_normal);


function startGeneral() {
    
    //console.log(shuffledQuestions);
    
    getnewQuestion();

    //###########################Start Button verschwinden lassen##################################################
    let start_button = document.getElementById("button");
    start_button.classList.add("hidden");

    //###################mverstecktes Quiz anzeigen lassen (Klasse "hidden" entfernen)#############################
    for (let i = 0; i < choice_text.length; i++) {
        choice_text[i].classList.remove("hidden");
    }

    const choice_prefix = document.getElementsByClassName("choice-prefix");
    for (let i = 0; i < choice_prefix.length; i++) {
        choice_prefix[i].classList.remove("hidden");
    }

    const progress_bar = document.getElementsByClassName("progressbar");
    for (let i = 0; i < progress_bar.length; i++) {
        progress_bar[i].classList.remove("hidden");
    }
}

function getnewQuestion()
{
    //######################################Antworten durchmischen ##################################################
    shuffledAnswers = questions["teilAllgemein"][currentQuestion].l.sort(() => Math.random() - .5);
    console.log(shuffledAnswers); 

    //#######################################Frage einfügen#######################################################
    var question = document.getElementById("questions");
    question.innerHTML = questions["teilAllgemein"][currentQuestion].a;


    //Antworten einfügen
    for (let i = 0; i < choice_text.length; i++) {
        choice_text[i].innerHTML = questions["teilAllgemein"][currentQuestion].l[i];
    }

    currentQuestion += 1;
    console.log(currentQuestion);
}


function getColor(element){
    element.setAttribute('style','background-color: green')
    setTimeout(function(){
        getnewQuestion();
        element.style.backgroundColor = 'white';
    }, 500);
}

function check_answer(element){

    var text = element.querySelectorAll(".choice-text");

    if(text[0].textContent == questions_normal["teilAllgemein"][currentQuestion].l[0]){
        console.log("richtig");
    } else {
        console.log("falsch");
    }

    console.log(text[0].textContent);
    console.log(questions_normal["teilAllgemein"][currentQuestion].l[0]);
}
    const buttons = document.querySelectorAll('.choice-container');

    buttons.forEach(button => {
        button.addEventListener('click', function handleClick(event){
            console.log('button clicked', event);

            button_id = button.id;

            console.log(button);
            check_answer(button);
            getColor(button);
            
        });
    });
