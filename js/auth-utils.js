// دوال مساعدة لنظام المصادقة

class AuthUtils {
    static saveUserData(userData) {
        try {
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', userData.token || '');
            localStorage.setItem('user_id', userData.id || '');
            localStorage.setItem('user_email', userData.email || '');
            localStorage.setItem('user_name', userData.name || '');
            localStorage.setItem('user_role', userData.role || 'user');
            localStorage.setItem('login_time', new Date().toISOString());
            
            // حفظ في sessionStorage أيضاً للجلسة الحالية
            sessionStorage.setItem('user_token', userData.token || '');
            
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }

    static getUserData() {
        try {
            const userData = localStorage.getItem('user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    }

    static getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('user_token');
    }

    static isLoggedIn() {
        const token = this.getToken();
        if (!token) return false;

        // التحقق من انتهاء صلاحية الجلسة
        const loginTime = localStorage.getItem('login_time');
        if (loginTime) {
            const loginDate = new Date(loginTime);
            const now = new Date();
            const hoursDiff = Math.abs(now - loginDate) / 36e5; // الفرق بالساعات
            
            // إذا مرت أكثر من 24 ساعة، تعتبر الجلسة منتهية
            if (hoursDiff > 24) {
                this.clearUserData();
                return false;
            }
        }

        return true;
    }

    static clearUserData() {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_role');
            localStorage.removeItem('login_time');
            
            sessionStorage.removeItem('user_token');
            
            return true;
        } catch (error) {
            console.error('Error clearing user data:', error);
            return false;
        }
    }

    static checkExistingSession() {
        return this.isLoggedIn();
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        // دعم صيغ الهواتف السعودية
        const re = /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
        return re.test(phone);
    }

    static validatePasswordRequirements(password) {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };
    }

    static checkPasswordStrength(password) {
        let score = 0;
        const requirements = this.validatePasswordRequirements(password);
        
        if (requirements.length) score += 1;
        if (requirements.uppercase) score += 1;
        if (requirements.lowercase) score += 1;
        if (requirements.number) score += 1;
        if (requirements.special) score += 1;
        
        let strength = 'ضعيفة جداً';
        let color = '#ef4444'; // أحمر
        let percentage = 20;
        
        if (score === 1) {
            strength = 'ضعيفة';
            color = '#f97316'; // برتقالي
            percentage = 40;
        } else if (score === 2) {
            strength = 'متوسطة';
            color = '#eab308'; // أصفر
            percentage = 60;
        } else if (score === 3) {
            strength = 'جيدة';
            color = '#84cc16'; // أخضر فاتح
            percentage = 80;
        } else if (score >= 4) {
            strength = 'قوية جداً';
            color = '#10b981'; // أخضر
            percentage = 100;
        }
        
        return {
            score,
            strength,
            color,
            percentage
        };
    }

    static calculatePasswordStrength(password) {
        return this.checkPasswordStrength