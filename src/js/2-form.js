const form = document.querySelector('.feedback-form');
//создаю ключь для хранилища
const localStorageKey = "feedback-form-state";
let formData = {
  email: "",
  message: "",
};

//ф-ция - которая сразу вызывается (после того как пользователь зашёл на страницу):

// беру значения с хранилища

const fillFormFields = () => {
  try {
        //первое посещение странички- данных в хранинилище нет?- проверка: если null сделать return// или проверить длинну LS до того как доставать данные
    if (localStorage.length === 0) {
      return;
    }
    
    const formDataFromLS = JSON.parse(localStorage.getItem(localStorageKey));


//если поменять данные в одном месте и перезайти = всё в др полях стирается - чтоб это поменять = когда достаем данные с LS сразу их записывать в обьект formDate.для того чтоб обновился и хранил все данные с LS
formData = formDataFromLS;

//на каждой итерации обращаться к форме к псевдомассиву ellements[с ключом key]- к значению value;Записшим  туда значение что достали с хранилища с ключом как у текущей итерации

for (let key in formDataFromLS) {
form.elements[key].value = formDataFromLS[key]; 
};

  } catch(error) {
  console.log(error.name);
  console.log(error.message);
  }
};
fillFormFields();

console.log(localStorageKey)

const onFormFieldChange = event => {
  event.preventDefault();

//целевой элем
// const formEventEl = event.target;
//деструкторизация 
const { target: formEventEl } = event;

//считать значения с input

const fieldValue = formEventEl.value


//чтоб подставить значения в объект надо считать значения с атребутов- По значению этого атребута обращаемся к объекту
const fieldName = formEventEl.name

//Обратиться к объекту с ключом, который соответсвует значению переменной [переменная]= значение переменной; 
//Записую в ключь значение что ввёл пользователь;
formData[fieldName] = fieldValue;

//отправляю объект в localStor-хранилище, переведя в строку JSON иначе [objectObject]
localStorage.setItem(localStorageKey, JSON.stringify(formData));
}



form.addEventListener('input', onFormFieldChange);


//чистка формы и LS при отправки ф-мы
const onFeedbackSubmit = event => {
  event.preventDefault();
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  } else {
    console.log(formData);
  }

// event.currentTarget.reset();
//деструктуризация 
const { currentTarget: formEL } = event;
formEL.reset();

//чистка LS
  localStorage.removeItem(localStorageKey);
};

form.addEventListener('submit', onFeedbackSubmit);