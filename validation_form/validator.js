//Doi tuong 'Valdator'
function Validator(options) { 
    
   var selectorRules = {};
   //ham thuc hien validate
   function validate(inputElement , rule) { 
            //value: inputElement.value: tra ve gia tri nhap vao cua input
            //test func: rule.test 
            
            //inputElement.value : lay ra gia tri khi nhap vao cua the input

            // var errorMessage = rule.test(inputElement.value);
            var errorMessage;
            //goi den parent chua input va sau do goi the span trong html
            var errorElement = inputElement.parentElement.querySelector('.form-message')
            
            //lay ra cac rules cua selector
            var rules = selectorRules[rule.selector];
            
            //lap qua tung rule & check
           // neu co loi thi dung viet kiem tra
            for(var i = 0 ; i < rules.length;i++) { 
               errorMessage = rules[i](inputElement.value);
               if(errorMessage) break;
            }
            //neu ma co errorMessage => co loi
            if(errorMessage) {
               errorElement.innerText = errorMessage;
               inputElement.parentElement.classList.add('invalid')
            }else { 
               errorElement.innerText = '';
               inputElement.parentElement.classList.remove('invalid')
            } 
            //chuyen thanh toan tu bool : tra ve true or false
            return !errorMessage;       
   }
   //lay ra id cua selector form 
   var formElement = document.querySelector(options.form);
   
   //neu nhu co the trong html voi id la form
   if(formElement) { 
      //bo di hanh vi mac dinh khi bam submit
      formElement.onsubmit = function(e) { 
         e.preventDefault();
         
         var isFormValid = true;

         options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(inputElement,rule);
            if(!isValid) { 
               isFormValid = false;
            }
         })  

         if(isFormValid) { 
            //truong hop submit voi javascrip 
            if(typeof options.onSubmit === 'function') { 

               var enableInputs = formElement.querySelectorAll('[name]')

               var formValues = Array.from(enableInputs).reduce(function (values,input){
                  return (values[input.name] = input.value) && values;
               },{});
               options.onSubmit(formValues);
            }

             //truong hop submit voi hanh vi mac dinh
             else {
               formElement.submit();
            }
         }
      }

      //lap qua moi rule va xu ly
      //duyet qua tuong ham trong rule 
    options.rules.forEach(function (rule) {

      //luu lai cac rules cho moi input 
      if(Array.isArray(selectorRules[rule.selector])) {
         selectorRules[rule.selector].push(rule.test);
      }else {
         selectorRules[rule.selector] = [rule.test];
      }
     
      //lay ra selector da duoc dinh nghia
      //in ra rule la in ra tung object duoc tra ve 
      //trong ham rules 
      
      //tra ve 2 the input voi id duoc dat trong ham 
      //goi thang con trong the formElement 
      var inputElement = formElement.querySelector(rule.selector);
      
      //neu nhu co the thi goi su kien onblur:
      //su kien onblur:...
      if(inputElement) {
         // xu li truong hop blur khoi input
         inputElement.onblur = function() {
            validate(inputElement,rule)
         }
          
         // xu li moi khi nguoi dung nhap vao input 
         inputElement.oninput = function() {
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector)   
               errorElement.innerText = '';
               inputElement.parentElement.classList.remove('invalid')
         }
      }
    });
   }
}

//dinh nghia cac rules
//nguyen tac cua cac rule s
//1. khi co loi => tra ra messae loi
//2. khi hop  le => undifned
Validator.isRequired = function(selector,message) {
   return {
      //return ve gia tri duoc truyen vao
      selector: selector,
      
      test(value) { 
         //trim() : loai bo tat ca cac dau cach
         return value.trim() ? undefined :message || 'vui long nhap truong nay'
      }
   }
}


Validator.isEmail = function(selector) { 
   return {
      selector: selector,
      //test: check xem co phai la email hay ko , 
      //su dung regex
      test: function(value) { 
         var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
         return regex.test(value) ? undefined : 'truong nay phai la email'
      }
    }
}

//do dai toi thieu cho password
Validator.minLength = function(selector, min) { 
   return {
      selector: selector,
      test: function(value) { 
         return value.length >= min ? undefined : 'vui long nhap toi thieu 6 ky tu'
      }
    }
}

Validator.isConfirmed = function (selector,getConfirmValue,message) {
   return {
       selector: selector,
       test: function (value) {
         return value == getConfirmValue() ? undefined :message || 'Gia tri nhap vao khong chinh xac'
       }
   }
}