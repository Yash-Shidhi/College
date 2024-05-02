let submit=document.getElementById('submit');
let back=document.getElementById('back');
let now=document.getElementById('now');
let cancel=document.getElementById('cancel');
let confirm=document.getElementById('confirm');
let billDate;

let term;

let premium=0;
let amount=0;
let GST=0;
let finalAmnt=0;

function confirmPay(){
    $(document).ready(function(){
        $('.box3').css('scale',0);
        $('.popup').css({
            'margin-top':'50px',
            'transition':'2s'
        });
    })
}

function cancelPay(){
    $(document).ready(function(){
        $('.box2').css('scale',1);
        $('.box3').css('scale',0);
    })
}
function payNow(){
    $(document).ready(function(){
        $('.box2').css('scale',0);
        $('.box3').css('scale',1);
    })
}
function goBack(){
    $(document).ready(function(){
        $('#myForm')[0].reset();
        $('.box1').css('scale',1);
        $('.box2').css('scale',0);
    })
}
function calculateDate() {
        let curDate = new Date();
        let year1=curDate.getFullYear();
        let month1=String(curDate.getMonth() + 1).padStart(2, '0');
        let day1=String(curDate.getDate()).padStart(2, '0');
        billDate=`${year1}-${month1}-${day1}`;
        curDate.setDate(curDate.getDate() + 28);
        let year2 = curDate.getFullYear();
        let month2 = String(curDate.getMonth() + 1).padStart(2, '0');
        let day2 = String(curDate.getDate()).padStart(2, '0');
        let nextDate = `${year2}-${month2}-${day2}`;
        return nextDate;
    }
function premiumCalc(term,sum){
    let smoke = document.querySelector('input[name="smok"]:checked');
    let frequency=document.querySelector('input[name="freq"]:checked');
    if(smoke && frequency)
    {
        if(smoke.value==='yes' && frequency.value==='quarter'){
        term=term*4;
        amount=sum/term;
        premium=amount+0.1*amount; //10% for smoking 
        GST=0.07*premium;
        finalAmnt=premium+GST;

        }
        if(smoke.value==='yes' && frequency.value==='half'){

            term=term*2;
            amount=sum/term;
            premium=amount+0.1*amount;
            GST=0.07*premium;
            finalAmnt=premium+GST;
        }
        if(smoke.value==='yes' && frequency.value==='year'){
            amount=sum/term;
            premium=amount+0.1*amount;
            GST=0.07*premium;
            finalAmnt=premium+GST;
        }
        if(smoke.value==='no' && frequency.value==='quarter'){
            term=term*4;
            amount=sum/term;
            premium=amount;
            GST=0.07*premium;
            finalAmnt=premium+GST;
        }
        if(smoke.value==='no' && frequency.value==='half'){
            term=term*2;
            amount=sum/term;
            premium=amount;
            GST=0.07*premium;
            finalAmnt=premium+GST;
        }
        if(smoke.value==='no' && frequency.value==='year'){
            amount=sum/term;
            premium=amount;
            GST=0.07*premium;
            finalAmnt=premium+GST;
        }
    }
    let formattedDate=calculateDate();
    document.getElementById('premiumResult').innerHTML = `Premium Due: Rs ${premium.toFixed(2)}<br><br>
    GST Amount: Rs ${GST.toFixed(2)}<br><br>
    Due Amount: Rs ${finalAmnt.toFixed(2)}<br><br>
    Bill fethched on: ${billDate}<br><br>
    Bill Due Date: ${formattedDate}`;
    $(document).ready(function(){
        $('.box1').css('scale',0);
        $('.box2').css('scale',1);
    })
    
    
    
}
    function validateForm(event){
        event.preventDefault();
        let select = document.getElementById('select');
        let selected = select.value;
        term=document.getElementById('term').value;
        let sum = parseFloat(document.getElementById('sum').value);
        let mobile=document.getElementById('mobile').value;
        if (selected === "") {
            alert("Please select an option");
            return false;
        }
        
        if(term.trim()===""){
            alert("Please enter term");
            return false;
        }
        if(term<5 || term >30){
            alert("Policy term must be between 5 and 30 years");
            return false;
        }
        if(mobile.length!==10){
            alert("Mobile Number should be of 10 digits");
            return false;
        }
        premiumCalc(term,sum);
        
    }


submit.addEventListener('click', validateForm);
back.addEventListener('click',goBack);
now.addEventListener('click',payNow);
cancel.addEventListener('click',cancelPay);
confirm.addEventListener('click',confirmPay);