const form = document.querySelector('#form');


form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = [
        {
            id: 'name',
            label: 'Nome',
            validator: nameIsValid,
        },
        {
            id: 'sobrenome',
            label: 'Sobrenome',
            validator: nameIsValid,
        },
        {
            id: 'nascimento',
            label: 'Nascimento',
            validator: dateIsValid,
        },
        {
            id: 'email',
            label: 'E-mail',
            validator: emailIsValid,
        },
        {
            id: 'senha',
            label: 'Senha',
            validator: passwordIsSecure,
        },
        {
            id: 'confirme_senha',
            label: 'Confirmar senha',
            validator: passwordMatch,
        },
    ]


    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const inputBox = input.closest('#input-box')
        const inputValue = input.value;

        const errorSpan = inputBox.querySelector('.error');
        errorSpan.innerHTML = '';
        
        inputBox.classList.remove('invalid');
        inputBox.classList.add('valid');

        const fieldValidator = field.validator(inputValue); 

        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMsg}`
            inputBox.classList.add('invalid');
            inputBox.classList.remove('valid');
            return;
        }
    });

    
    const gender = document.getElementsByName('gender');
    const radioContainer = document.querySelector('.radio-container');
    const genderErroSpan = radioContainer.querySelector('.error');
    
    const selectedGender = [...gender].find(input => input.checked);

    radioContainer.classList.add('invalid');
    radioContainer.classList.remove('valid');
    genderErroSpan.innerHTML = `${errorIcon} Selecione um gênero`
    if(selectedGender){
        radioContainer.classList.add('valid');
        radioContainer.classList.remove('invalid');
        genderErroSpan.innerHTML = '';
        return;

    }


});

function isEmpty(value) {
    return value === '';
}


function nameIsValid(value) {
    const validator = {
        isValid: true,
        errorMsg: null
    }


    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMsg = 'O campo é obrigatório!'
        return validator;
        
    }

    const min = 3;
    if(value.length < min) {
        validator.isValid = false;
        validator.errorMsg = `Campo deve conter no minímo ${min} letras!`
        return validator;
    }

    const regex = /^[a-zA-Z]/;
    if(!regex.test(value)) {
        validator.isValid = false;
        validator.errorMsg = 'O campo deve conter apenas letras!'

    }
    return validator;

}

function dateIsValid (value) {
    const validator = {
        isValid: true,
        errorMsg: null,

    }
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMsg = 'O nascimento é obrigatório!'
        return validator;
        
    }
    const year = new Date(value).getFullYear();
    if(year <  1920 || year > new Date().getFullYear) {
        validator.isValid = false;
        validator.errorMsg = 'Data inválida!'
        return validator;
    }
    return validator;
}
function emailIsValid(value) {
    const validator = {
        isValid: true,
        errorMsg: null,

    }
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMsg = 'O e-mail é obrigatório!'
        return validator;
        
    }
    const regex = new RegExp("^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$");
    if(!regex.test(value)) {
        validator.isValid = false;
        validator.errorMsg = 'Insira um e-mail válido!'
        return validator;
    }
    return validator;
}
function passwordIsSecure(value) {
    const validator = {
        isValid: true,
        errorMsg: null,

    }
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMsg = 'A senha é obrigatória!'
        return validator;
    }
    const regex = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$");
    if(!regex.test(value)){
        validator.isValid = false;
        validator.errorMsg = `
            Sua senha deve conter ao menor: <br/>
            Minímo 8 digitos <br/>
            1 letra minúscula <br/>
            1 letra maiúscula <br/>
            1 número <br/>
            1 caractere especial
        `;
        return validator;

    }
    return validator;
}
function passwordMatch(value){
    const validator = {
        isValid: true,
        errorMsg: null,

    }
    const passwordValue = document.getElementById('senha').value;
    if(value === '' || passwordValue !== value){
        validator.isValid = false;
        validator.errorMsg = 'Senhas não combinam!';
        return validator;
    }
    return validator;
}

//password-icon
const passwordIcons = document.querySelectorAll('.password-icon');

passwordIcons.forEach(icon => {
    icon.addEventListener('click', function(){
        const input = this.parentElement.querySelector('.form-control');
        input.type = input.type === 'password' ? 'text' : 'password';
        this.classList.toggle('fa-eye');
    })
})


