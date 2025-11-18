// script.js - Обработчик формы обратной связи
document.addEventListener('DOMContentLoaded', function() {
    console.log('Форма обратной связи готова к работе');
    
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Показываем индикатор загрузки
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            comment: document.getElementById('comment').value.trim()
        };

        // Скрываем старые ошибки
        hideErrors();

        // Проверяем форму
        const errors = checkForm(formData);

        if (Object.keys(errors).length === 0) {
            // Форма валидна - показываем успех
            showSuccess(formData);
            form.reset();
        } else {
            // Показываем ошибки
            showErrors(errors);
        }

        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
    

    // Функция проверки формы
    function checkForm(data) {
        const errors = {};

        if (!data.name) {
            errors.name = 'Пожалуйста, введите ваше имя';
        } else if (data.name.length < 2) {
            errors.name = 'Имя должно содержать минимум 2 символа';
        }

        if (!data.email) {
            errors.email = 'Пожалуйста, введите email';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Пожалуйста, введите корректный email';
        }

        if (!data.comment) {
            errors.comment = 'Пожалуйста, введите ваше сообщение';
        } else if (data.comment.length < 10) {
            errors.comment = 'Сообщение должно содержать минимум 10 символов';
        }

        return errors;
    }

    // Функция показа ошибок
    
    function showErrors(errors) {
        for (const field in errors) {
            const errorElement = document.getElementById(field + 'Error');
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.style.display = 'block';
                
                // Добавляем стили для поля с ошибкой
                const input = document.getElementById(field);
                if (input) {
                    input.style.borderColor = '#e74c3c';
                    input.style.background = '#fdf2f2';
                }
            }
        }
    }

    // Функция показа успешного сообщения
    function showSuccess(data) {
    const successElement = document.getElementById('successMessage');
    if (!successElement) return;

    successElement.innerHTML = `
        <h3>Спасибо, ${data.name}!</h3>
        <p><strong>Ваши данные:</strong></p>
        <p><strong>Имя:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Комментарий:</strong> ${data.comment}</p>
        <p style="margin-top: 1rem;">Мы свяжемся с вами в ближайшее время.</p>
    `;
    
    successElement.style.display = 'block';
    
    // Автоматически скрываем сообщение через 8 секунд (увеличил время для чтения)
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 30000);
}

    // Функция скрытия ошибок
    function hideErrors() {
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
        });

        document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.style.borderColor = '#e1e8ed';
            input.style.background = '#ffffff';
        });

        const successElement = document.getElementById('successMessage');
        if (successElement) {
            successElement.style.display = 'none';
        }
    }

    // Функция проверки email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Сбрасываем ошибки при вводе
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            this.style.borderColor = '#e1e8ed';
            this.style.background = '#ffffff';
        });
    });
});








