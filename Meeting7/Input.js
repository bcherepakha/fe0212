class Input {
    constructor(props) {
        this._props = props;
        this._willValidate = false;
        this._valid = null;
        this._validationMessage = '';

        this._inputEl = this._props.root.querySelector('input');
        this._helperEl = this._props.root.querySelector('.input__helper');

        if (!this._helperEl) {
            this._helperEl = document.createElement('span');
            this._helperEl.className = 'input__helper';
            this._props.root.append(this._helperEl);
        }

        this._inputEl.addEventListener('focus', this.onFocus.bind(this));
        this._inputEl.addEventListener('blur', this.onBlur.bind(this));
    }

    get name() {
        return this._inputEl.name;
    }

    get value() {
        return this._inputEl.value;
    }

    addCustomValidation(validator) {
        if (validator) {
            this._customValidator = validator;
        }
    }

    onFocus() {
        this._props.root.classList.add('input--active');
    }

    onBlur() {
        if (!this._inputEl.value) {
            this._props.root.classList.remove('input--active');
        }

        if (this._props.validateOnBlur) {
            this.checkValidity();
        }
    }

    checkValidity() {
        this._willValidate = true;

        let valid = true;
        let validationMessage = '';

        if (this._customValidator) {
            const result = this._customValidator(this._inputEl.value, this._inputEl);

            valid = result.valid;
            validationMessage = result.validationMessage;
            // this._inputEl.setCustomValidity(validationMessage);
        }

        if (valid) {
            this._inputEl.checkValidity();

            const {validity} = this._inputEl;

            valid = validity.valid;
            validationMessage = this.getValidationMessage(validity);
            // this._inputEl.setCustomValidity(validationMessage);
        }

        if (valid) {
            this._props.root.classList.add('input--valid');
            this._props.root.classList.remove('input--error');
        } else {
            this._props.root.classList.add('input--error');
            this._props.root.classList.remove('input--valid');
            this._helperEl.innerText = validationMessage;
        }

        this._valid = valid;
        this._validationMessage = validationMessage;

        return valid;
    }

    getValidationMessage(validity) {
        switch (true) {
        case validity.patternMismatch:
            return 'Не соответсвие шаблону';
        case validity.tooLong:
            return `Значение должно быть длиной меньше ${this._inputEl.maxLength} символов`;
        case validity.tooShort:
            return `Значение должно быть длиной больше ${this._inputEl.minLength} символов`;
        case validity.valueMissing:
            return 'Поле обязательно к заполнению';
        default:
            return '';
        }
    }
}

class Form {
    constructor(props) {
        this._props = props;
        this._props.root.noValidate = true;
        this._elements = {};

        const intputColl = Array.from(this._props.root.querySelectorAll('.input'));
        const input = intputColl.map(el => new Input({
            root: el,
            validateOnBlur: true,
        }));

        input.forEach(el => {
            if (this._props.validators[el.name]) {
                el.addCustomValidation(this._props.validators[el.name].bind(this));
            }

            this._elements[el.name] = el;
        });

        this._props.root.addEventListener('submit', this.onSubmit.bind(this));
    }

    getInputByName(name) {
        return this._elements[name];
    }

    onSubmit(e) {
        e.preventDefault();
        const inputs = Object.values(this._elements);
        let valid = true;
        const data = {};

        inputs.forEach(input => {
            valid = input.checkValidity() && valid;
            data[input.name] = input.value;
        });

        if (valid) {
            console.log(data);
        }
    }
}

const signupForm = new Form({
    root: document.querySelector('.signup'),
    validators: {
        password: function(value) {
            // Символов больше 8
            // Первая заглавная
            // Присутствуют спец. символы
            // Присутсвуют маленькие буковки (хотя бы одна)
            // Присутсвуют цифры (хотя бы одна)
            const isMinLength = value.length > 8;
            const isFirstLetterUpper = !!value[0] && value[0].toUpperCase() === value[0];
            const hasSpecialSymbols = ['#', '@', '$', '&', '^', '*', '?'].some(symbol => value.indexOf(symbol) > -1);
            const hasSmallLetter = value.search(/[a-zа-я]/) > -1;
            const hasDigits = /\d/.test(value);

            const valid = isMinLength && isFirstLetterUpper && hasSpecialSymbols && hasSmallLetter && hasDigits;
            const validationMessage = 'Пароль должен начинаться с большой буквы, содержать маленькие буквы, цифры и спец. символы и быть длиннее 8 символов';

            return {
                valid,
                validationMessage: valid ? '' : validationMessage
            };
        },
        confirm: function(value) {
            const passwordInput = this.getInputByName('password');

            let valid = true;
            const validationMessage = 'Значение должно быть идентично паролю';

            if (passwordInput.value) {
                valid = passwordInput.value === value;
            }

            return {
                valid,
                validationMessage: valid ? '' : validationMessage
            };
        }
    }
});

console.log( signupForm );
