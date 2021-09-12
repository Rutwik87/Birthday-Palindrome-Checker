const form = document.querySelector('#form')
const result = document.querySelector('#result')
const numDays = document.querySelector('#numDays')


function dateList(date){
    const myArray = date.split("-");
    var dateArray = [];
    dateArray.push(
        `${myArray[2]}${myArray[1]}${myArray[0]}` , 
        `${myArray[1]}${myArray[2]}${myArray[0]}` , 
        `${myArray[0]}${myArray[1]}${myArray[2]}` , 
        `${myArray[2]}${myArray[1]}${myArray[0].slice(2,)}` ,
        `${myArray[1]}${myArray[2]}${myArray[0].slice(2,)}`,
        `${myArray[0].slice(2,)}${myArray[1]}${myArray[2]}`
        );
    return dateArray;
}

function palindromeChecker(text){
    for ( let i = 0 ; i < text.length ; i++){
        if ( text[i] !== text[(text.length - 1) - i]){
            return false
        }
    }
    return true
}

function palindromeDateListChecker(dateList){
    for(let date of dateList){
        if(palindromeChecker(date)){
            return true
        }    
    }
    return false
}

function getNextDate(date){
    var today = new Date(date);
    var nextDay = new Date(today);
    nextDay.setDate(today.getDate()+1);
    return nextDay;
}

function dateToString(date){
    var dd = `${date.getDate()}`
    var mm = `${date.getMonth() + 1}`
    if(date.getMonth()+1 < 10 ){
        mm = `0${mm}`
    }
    if(dd < 10 ){
        dd = `0${dd}`
    }
    return `${date.getFullYear()}-${mm}-${dd}`
}

function nearestPalindrome(date){
    for ( let i = 1 ; i > 0 ; i++){
        date = getNextDate(date);
        dateStr = dateToString(date);
        if(palindromeDateListChecker(dateList(dateStr))){
            return [dateStr , i]
        }
    }
}

form.addEventListener('submit' , function(e){
    e.preventDefault()
    if(this.dob.value === "" ){
        result.innerText = "Invalid Input !!!"    
        numDays.innerText = ""
    }
    else{
        if(palindromeDateListChecker(dateList(this.dob.value))){
        result.innerText = "Palindrome!!!"    
        numDays.innerText = ""
        return 
        }
        else{
        result.innerText = "Not a Palindrome!!!"
        var output = nearestPalindrome(this.dob.value);
        }
        const dateDays = nearestPalindrome(this.dob.value)
        numDays.innerText = `Nearest palindrome date is ${dateDays[0]}  , you missed by ${dateDays[1]} days`
    }
})