class Validator {
    clean = true;
    errors = []
    validations = []

    valid() {
        return !this.clean && this.errors.length === 0;
    }

    validate(field) {
        this.clean = false;
        this.errors = [];

        for (const validation of this.validations) {
            const result = validation.validate(field);

            if (!result) {
                this.errors.push(validation.error);
                return false;
            }
        }

        return true;
    }

    add(validation) {
        this.validations.push(validation);
        return this;
    }
}

class NotNullValidation {
    error = "El campo no puede ser nulo";

    validate(s) {
        return !!s;
    }
}

class EmailValidation {
    error = "El email no es válido";

    validate(s) {
        // Expresión regular para correos
        return s.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    }
}

class PasswordValidation {
    error = "La contraseña debe tener 8 o más carácteres"

    validate(s) {
        return s.length >= 8;
    }
}

const emailValidator = new Validator()
    .add(new NotNullValidation())
    .add(new EmailValidation());

const passwordValidator = new Validator()
    .add(new NotNullValidation())
    .add(new PasswordValidation());

const form = document.getElementById("login-form");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailErrors = document.getElementById("email-errors");
const passwordErrors = document.getElementById("password-errors");

function handleInputValidation(input, validator, errors) {
    validator.validate(input.value);

    const messages = validator.errors.map(error => {
        const element = document.createElement("p");
        element.innerText = error;

        return element;
    })

    errors.replaceChildren(...messages);
}

function handleValidatorClean(input, validator, errors) {
    if (validator.clean)
        handleInputValidation(input, validator, errors);
}

form.addEventListener("submit", e => {
    e.preventDefault();

    if (emailValidator.valid() && passwordValidator.valid()) {
        alert("Has ingresado correctamente, tus datos se han guardado en el localStorage")

        localStorage.setItem("user", JSON.stringify({ 
            email: email.value, 
            password: password.value 
        }));
    } else {
        handleValidatorClean(email, emailValidator, emailErrors);
        handleValidatorClean(password, passwordValidator, passwordErrors);
    }
})

email.addEventListener("input", e => 
    handleInputValidation(e.target, emailValidator, emailErrors));

password.addEventListener("input", e => 
    handleInputValidation(e.target, passwordValidator, passwordErrors));