let countdown;

const displaytime= document.querySelector('.display__time-left');
const endTime= document.querySelector('.display__end-time');
const button= document.querySelectorAll('[data-time]');

function timer(seconds){

    //purana Wala clear karna pdega 
    clearInterval(countdown);

    const now = Date.now();
    const then= now+seconds*1000;
    displayEndTime(then);
    displayTimeLeft(seconds);
    
    countdown= setInterval(()=>{
        const secondsLeft=Math.round((then-Date.now())/1000);
        if(secondsLeft<=0){
           clearInterval(countdown);
           return;
        }
       displayTimeLeft(secondsLeft);    
    },1000);
}


function displayTimeLeft(seconds){
    const minutes=Math.floor(seconds/60);
    const remainderSeconds=seconds%60;
    const display=`${minutes}:${remainderSeconds<10?'0':''}${remainderSeconds}`;
    document.title=display;
    displaytime.textContent=display;
    console.log({minutes,remainderSeconds});
}



function displayEndTime(timestamp){
    const end= new Date(timestamp);
    const hour= end.getHours();
    const minutes=end.getMinutes();
    endTime.textContent=`Be at ${hour>12?hour-12:hour}:${minutes}`;

}

function startTimer(){
    const seconds=parseInt(this.dataset.time);
    timer(seconds);
}

button.forEach(btn=>btn.addEventListener('click',startTimer));


document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins=this.minutes.value;
    
    timer(mins*60);
    this.reset();
    console.log(mins);
})
