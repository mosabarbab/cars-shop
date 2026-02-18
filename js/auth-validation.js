// نظام التحقق من صحة بيانات المصادقة

class AuthValidator {
    constructor() {
        this.rules = {
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                patternMessage: 'بريد إلكتروني غير صالح'
            },
            password: {
                required: true,
                minLength: 8,
                minLengthMessage: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
            },
            fullName: {
                required: true,
                minLength: 3,
                minLengthMessage: 'الاسم يجب أن يكون 3 أحرف على الأقل'
            },
            phone: {
                required: true,
                pattern: /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
                patternMessage: 'رقم هاتف غير صالح'
            },
            city: {
                required: true
            },
            userType: {
                required: true
            },
            terms: {
                required: true,
                requiredMessage: 'يجب الموافقة على الشروط والأحكام'
            }
        };
    }

    validateLoginForm(form) {
        const errors = {};
        const formData = new FormData(form);

        // التحقق من البريد الإلكتروني
        const email = formData.get('email') || '';
        if (!email.trim()) {
            errors.email = 'البريد الإلكتروني مطلوب';
        } else if (!this.rules.email.pattern.test(email)) {
            errors.email = this.rules.email.patternMessage;
        }

        // التحقق من كلمة المرور
        const password = formData.get('password') || '';
        if (!password) {
            errors.password = 'كلمة المرور مطلوبة';
        } else if (password.length < this.rules.password.minLength) {
            errors.password = this.rules.password.minLengthMessage;
        }

        return errors;
    }

    validateRegisterStep1(form) {
        const errors = {};
        const formData = new FormData(form);

        // التحقق من الاسم الكامل
        const fullName = formData.get('fullName') || '';
        if (!fullName.trim()) {
            errors.fullName = 'الاسم الكامل مطلوب';
        } else if (fullName.length < this.rules.fullName.minLength) {
            errors.fullName = this.rules.fullName.minLengthMessage;
        }

        // التحقق من البريد الإلكتروني
        const email = formData.get('email') || '';
        if (!email.trim()) {
            errors.email = 'البريد الإلكتروني مطلوب';
        } else if (!this.rules.email.pattern.test(email)) {
            errors.email = this.rules.email.patternMessage;
        }

        // التحقق من الهاتف
        const phone = formData.get('phone') || '';
        const countryCode = document.getElementById('countryCode')?.value || '+966';
        const fullPhone = countryCode + phone;
        
        if (!phone) {
            errors.phone = 'رقم الهاتف مطلوب';
        } else if (!this.validatePhoneNumber(fullPhone)) {
            errors.phone = 'رقم هاتف غير صالح';
        }

        // التحقق من المدينة
        const city = formData.get('city') || '';
        if (!city.trim()) {
            errors.city = 'المدينة مطلوبة';
        }

        // التحقق من نوع المستخدم
        const userType = formData.get('userType') || '';
        if (!userType) {
            errors.userType = 'نوع المستخدم مطلوب';
        }

        // التحقق من كلمة المرور
        const password = formData.get('password') || '';
        if (!password) {
            errors.password = 'كلمة المرور مطلوبة';
        } else {
            const passwordRequirements = this.validatePasswordRequirements(password);
            if (!passwordRequirements.valid) {
                errors.password = 'كلمة المرور لا تستوفي المتطلبات';
            }
        }

        // التحقق من تأكيد كلمة المرور
        const confirmPassword = formData.get('confirmPassword') || '';
        if (!confirmPassword) {
            errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'كلمة المرور غير متطابقة';
        }

        // التحقق من الشروط
        const terms = formData.get('terms') || '';
        if (!terms) {
            errors.terms = this.rules.terms.requiredMessage;
        }

        return errors;
    }

    validateResetPasswordForm(form) {
        const errors = {};
        const formData = new FormData(form);

        // التحقق من كلمة المرور الجديدة
        const newPassword = formData.get('newPassword') || '';
        if (!newPassword) {
            errors.newPassword = 'كلمة المرور الجديدة مطلوبة';
        } else {
            const passwordRequirements = this.validatePasswordRequirements(newPassword);
            if (!passwordRequirements.valid) {
                errors.newPassword = 'كلمة المرور لا تستوفي المتطلبات';
            }
        }

        // التحقق من تأكيد كلمة المرور
        const confirmPassword = formData.get('confirmNewPassword') || '';
        if (!confirmPassword) {
            errors.confirmNewPassword = 'تأكيد كلمة المرور مطلوب';
        } else if (newPassword !== confirmPassword) {
            errors.confirmNewPassword = 'كلمة المرور غير متطابقة';
        }

        return errors;
    }

    validatePhoneNumber(phone) {
        // دعم صيغ الهواتف السعودية والعربية
        const patterns = [
            /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, // السعودية
            /^(00971|971|\+971)(50|52|54|55|56|58)([0-9]{7})$/, // الإمارات
            /^(00973|973|\+973)(3|6|9)([0-9]{7})$/, // البحرين
            /^(00974|974|\+974)(3|5|6|7)([0-9]{7})$/, // قطر
            /^(00965|965|\+965)(5|6|9)([0-9]{7})$/ // الكويت
        ];

        return patterns.some(pattern => pattern.test(phone));
    }

    validatePasswordRequirements(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        requirements.valid = Object.values(requirements).every(req => req);

        return requirements;
    }

    displayErrors(errors) {
        // إخفاء جميع رسائل الخطأ السابقة
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.add('hidden');
        });

        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('border-red-500');
        });

        // عرض رسائل الخطأ الجديدة
        Object.entries(errors).forEach(([field, message]) => {
            const errorElement = document.getElementById(`${field}Error`);
            const inputElement = document.getElementById(field) || document.querySelector(`[name="${field}"]`);

            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.remove('hidden');
            }

            if (inputElement) {
                inputElement.classList.add('border-red-500');
                
                // إضافة تأثير اهتزاز
                inputElement.classList.add('animate__animated', 'animate__headShake');
                setTimeout(() => {
                    inputElement.classList.remove('animate__animated', 'animate__headShake');
                }, 1000);
            }
        });

        // عرض رسالة عامة إذا كان هناك أخطاء
        if (Object.keys(errors).length > 0) {
            this.showAlertMessage('يرجى تصحيح الأخطاء في النموذج', 'error');
        }
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.add('hidden');
        });

        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('border-red-500');
        });
    }

    showAlertMessage(message, type = 'error') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeInDown ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`;
        alertDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} mr-3"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.classList.add('animate__fadeOutUp');
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }

    validateEmail(email) {
        return this.rules.email.pattern.test(email);
    }

    validatePassword(password) {
        const requirements = this.validatePasswordRequirements(password);
        return requirements.valid;
    }

    validateFormField(fieldName, value) {
        const rule = this.rules[fieldName];
        if (!rule) return { valid: true, message: '' };

        if (rule.required && (!value || value.trim() === '')) {
            return { valid: false, message: 'هذا الحقل مطلوب' };
        }

        if (rule.pattern && value && !rule.pattern.test(value)) {
            return { valid: false, message: rule.patternMessage || 'القيمة غير صالحة' };
        }

        if (rule.minLength && value && value.length < rule.minLength) {
            return { valid: false, message: rule.minLengthMessage || `الحد الأدنى ${rule.minLength} حرف` };
        }

        if (rule.maxLength && value && value.length > rule.maxLength) {
            return { valid: false, message: rule.maxLengthMessage || `الحد الأقصى ${rule.maxLength} حرف` };
        }

        return { valid: true, message: '' };
    }

    realTimeValidation(inputElement) {
        const fieldName = inputElement.name || inputElement.id;
        const value = inputElement.value;
        
        if (!fieldName || !this.rules[fieldName]) return;

        const validation = this.validateFormField(fieldName, value);
        const errorElement = document.getElementById(`${fieldName}Error`);

        if (!validation.valid) {
            inputElement.classList.add('border-red-500');
            if (errorElement) {
                errorElement.textContent = validation.message;
                errorElement.classList.remove('hidden');
            }
        } else {
            inputElement.classList.remove('border-red-500');
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        }
    }

    setupRealTimeValidation() {
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('blur', () => this.realTimeValidation(input));
            input.addEventListener('input', () => {
                // إخفاء رسالة الخطأ عند البدء بالكتابة
                const fieldName = input.name || input.id;
                const errorElement = document.getElementById(`${fieldName}Error`);
                if (errorElement) {
                    errorElement.classList.add('hidden');
                    input.classList.remove('border-red-500');
                }
            });
        });
    }
}

// تصدير الفئة للاستخدام العام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthValidator;
}