// ملف API لوحة التحكم

class AdminAPI {
    constructor() {
        this.baseURL = 'https://api.souq-cars.com/admin';
        this.token = localStorage.getItem('adminToken');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('adminToken', token);
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = this.getHeaders();
        
        try {
            const response = await fetch(url, {
                ...options,
                headers: { ...headers, ...options.headers }
            });
            
            if (response.status === 401) {
                // غير مصرح - تسجيل الخروج
                this.handleUnauthorized();
                throw new Error('انتهت صلاحية الجلسة');
            }
            
            if (response.status === 403) {
                // ممنوع الوصول
                throw new Error('ليس لديك صلاحية للوصول إلى هذا المورد');
            }
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'حدث خطأ في الخادم');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    handleUnauthorized() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/index.html';
    }

    // ========== Authentication ==========
    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    async logout() {
        try {
            await this.request('/auth/logout', {
                method: 'POST'
            });
        } finally {
            this.handleUnauthorized();
        }
    }

    async verify2FA(code) {
        return this.request('/auth/verify-2fa', {
            method: 'POST',
            body: JSON.stringify({ code })
        });
    }

    async getProfile() {
        return this.request('/auth/profile');
    }

    async updateProfile(data) {
        return this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async changePassword(data) {
        return this.request('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // ========== Cars Management ==========
    async getCars(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/cars?${query}`);
    }

    async getCar(id) {
        return this.request(`/cars/${id}`);
    }

    async createCar(data) {
        return this.request('/cars', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateCar(id, data) {
        return this.request(`/cars/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteCar(id) {
        return this.request(`/cars/${id}`, {
            method: 'DELETE'
        });
    }

    async approveCar(id) {
        return this.request(`/cars/${id}/approve`, {
            method: 'POST'
        });
    }

    async rejectCar(id, reason) {
        return this.request(`/cars/${id}/reject`, {
            method: 'POST',
            body: JSON.stringify({ reason })
        });
    }

    async featureCar(id, featured = true) {
        return this.request(`/cars/${id}/feature`, {
            method: 'POST',
            body: JSON.stringify({ featured })
        });
    }

    async getCarReports(id) {
        return this.request(`/cars/${id}/reports`);
    }

    async resolveReport(carId, reportId, action) {
        return this.request(`/cars/${carId}/reports/${reportId}/resolve`, {
            method: 'POST',
            body: JSON.stringify({ action })
        });
    }

    // ========== Users Management ==========
    async getUsers(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/users?${query}`);
    }

    async getUser(id) {
        return this.request(`/users/${id}`);
    }

    async createUser(data) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateUser(id, data) {
        return this.request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteUser(id) {
        return this.request(`/users/${id}`, {
            method: 'DELETE'
        });
    }

    async banUser(id, reason, duration) {
        return this.request(`/users/${id}/ban`, {
            method: 'POST',
            body: JSON.stringify({ reason, duration })
        });
    }

    async unbanUser(id) {
        return this.request(`/users/${id}/unban`, {
            method: 'POST'
        });
    }

    async verifyUser(id) {
        return this.request(`/users/${id}/verify`, {
            method: 'POST'
        });
    }

    async getUserActivity(id) {
        return this.request(`/users/${id}/activity`);
    }

    async getUserCars(id) {
        return this.request(`/users/${id}/cars`);
    }

    // ========== Admins Management ==========
    async getAdmins() {
        return this.request('/admins');
    }

    async createAdmin(data) {
        return this.request('/admins', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateAdmin(id, data) {
        return this.request(`/admins/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteAdmin(id) {
        return this.request(`/admins/${id}`, {
            method: 'DELETE'
        });
    }

    async updateAdminPermissions(id, permissions) {
        return this.request(`/admins/${id}/permissions`, {
            method: 'PUT',
            body: JSON.stringify({ permissions })
        });
    }

    // ========== Orders Management ==========
    async getOrders(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/orders?${query}`);
    }

    async getOrder(id) {
        return this.request(`/orders/${id}`);
    }

    async updateOrderStatus(id, status) {
        return this.request(`/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }

    async refundOrder(id, amount, reason) {
        return this.request(`/orders/${id}/refund`, {
            method: 'POST',
            body: JSON.stringify({ amount, reason })
        });
    }

    // ========== Content Management ==========
    async getArticles(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/articles?${query}`);
    }

    async createArticle(data) {
        return this.request('/articles', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateArticle(id, data) {
        return this.request(`/articles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteArticle(id) {
        return this.request(`/articles/${id}`, {
            method: 'DELETE'
        });
    }

    async getCategories() {
        return this.request('/categories');
    }

    async createCategory(data) {
        return this.request('/categories', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateCategory(id, data) {
        return this.request(`/categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteCategory(id) {
        return this.request(`/categories/${id}`, {
            method: 'DELETE'
        });
    }

    // ========== Statistics & Reports ==========
    async getDashboardStats() {
        return this.request('/stats/dashboard');
    }

    async getSalesReport(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/reports/sales?${query}`);
    }

    async getUsersReport(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/reports/users?${query}`);
    }

    async getCarsReport(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/reports/cars?${query}`);
    }

    async getRevenueReport(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/reports/revenue?${query}`);
    }

    // ========== System Settings ==========
    async getSettings() {
        return this.request('/settings');
    }

    async updateSettings(data) {
        return this.request('/settings', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async getSystemInfo() {
        return this.request('/system/info');
    }

    async backupDatabase() {
        return this.request('/system/backup', {
            method: 'POST'
        });
    }

    async clearCache() {
        return this.request('/system/clear-cache', {
            method: 'POST'
        });
    }

    // ========== File Upload ==========
    async uploadFile(file, options = {}) {
        const formData = new FormData();
        formData.append('file', file);
        
        if (options.folder) {
            formData.append('folder', options.folder);
        }
        
        const headers = {};
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        try {
            const response = await fetch(`${this.baseURL}/upload`, {
                method: 'POST',
                body: formData,
                headers
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'فشل رفع الملف');
            }
            
            return data;
        } catch (error) {
            console.error('Upload Error:', error);
            throw error;
        }
    }

    async deleteFile(filePath) {
        return this.request('/upload', {
            method: 'DELETE',
            body: JSON.stringify({ path: filePath })
        });
    }

    // ========== Notifications ==========
    async getNotifications() {
        return this.request('/notifications');
    }

    async markNotificationAsRead(id) {
        return this.request(`/notifications/${id}/read`, {
            method: 'POST'
        });
    }

    async markAllNotificationsAsRead() {
        return this.request('/notifications/read-all', {
            method: 'POST'
        });
    }

    // ========== Activity Log ==========
    async getActivityLog(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/activity?${query}`);
    }

    async clearActivityLog(days) {
        return this.request('/activity/clear', {
            method: 'POST',
            body: JSON.stringify({ days })
        });
    }

    // ========== Search ==========
    async search(query, type = 'all') {
        return this.request(`/search?q=${encodeURIComponent(query)}&type=${type}`);
    }
}

// تهيئة API
window.adminAPI = new AdminAPI();

// دوال مساعدة للتعامل مع API
window.APIHelpers = {
    async handleApiCall(apiCall, successCallback, errorCallback) {
        try {
            const response = await apiCall();
            
            if (successCallback) {
                successCallback(response);
            }
            
            return response;
        } catch (error) {
            console.error('API Call Error:', error);
            
            if (errorCallback) {
                errorCallback(error);
            } else {
                AdminUtils.showToast(error.message || 'حدث خطأ في الاتصال', 'error');
            }
            
            throw error;
        }
    },

    async withLoading(apiCall, loadingElement) {
        if (loadingElement) {
            loadingElement.classList.remove('hidden');
            loadingElement.disabled = true;
        }
        
        try {
            const result = await apiCall();
            return result;
        } finally {
            if (loadingElement) {
                loadingElement.classList.add('hidden');
                loadingElement.disabled = false;
            }
        }
    },

    createFormData(formElement) {
        const formData = new FormData(formElement);
        const data = {};
        
        formData.forEach((value, key) => {
            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });
        
        return data;
    },

    validateForm(formElement, rules) {
        const errors = {};
        const formData = this.createFormData(formElement);
        
        Object.entries(rules).forEach(([field, rule]) => {
            const value = formData[field];
            
            if (rule.required && (!value || value.trim() === '')) {
                errors[field] = rule.requiredMessage || 'هذا الحقل مطلوب';
            } else if (rule.pattern && value && !rule.pattern.test(value)) {
                errors[field] = rule.patternMessage || 'القيمة غير صالحة';
            } else if (rule.minLength && value && value.length < rule.minLength) {
                errors[field] = rule.minLengthMessage || `الحد الأدنى ${rule.minLength} حرف`;
            } else if (rule.maxLength && value && value.length > rule.maxLength) {
                errors[field] = rule.maxLengthMessage || `الحد الأقصى ${rule.maxLength} حرف`;
            } else if (rule.email && value && !AdminUtils.validateEmail(value)) {
                errors[field] = 'بريد إلكتروني غير صالح';
            } else if (rule.phone && value && !AdminUtils.validatePhone(value)) {
                errors[field] = 'رقم هاتف غير صالح';
            }
        });
        
        return errors;
    },

    showFormErrors(formElement, errors) {
        // إزالة أخطاء سابقة
        formElement.querySelectorAll('.form-error').forEach(el => el.remove());
        formElement.querySelectorAll('.form-control.error').forEach(el => {
            el.classList.remove('error');
        });
        
        // إضافة أخطاء جديدة
        Object.entries(errors).forEach(([field, message]) => {
            const input = formElement.querySelector(`[name="${field}"]`);
            if (input) {
                input.classList.add('error');
                
                const errorElement = document.createElement('div');
                errorElement.className = 'form-error';
                errorElement.textContent = message;
                input.parentNode.appendChild(errorElement);
            }
        });
    },

    clearFormErrors(formElement) {
        formElement.querySelectorAll('.form-error').forEach(el => el.remove());
        formElement.querySelectorAll('.form-control.error').forEach(el => {
            el.classList.remove('error');
        });
    },

    handleImageUpload(inputElement, previewElement, onSuccess, onError) {
        const file = inputElement.files[0];
        
        if (!file) return;
        
        // التحقق من نوع الملف
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            AdminUtils.showToast('نوع الملف غير مدعوم', 'error');
            return;
        }
        
        // التحقق من حجم الملف (5MB كحد أقصى)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            AdminUtils.showToast('حجم الملف يجب أن يكون أقل من 5MB', 'error');
            return;
        }
        
        // عرض معاينة
        const reader = new FileReader();
        reader.onload = (e) => {
            if (previewElement) {
                previewElement.src = e.target.result;
                previewElement.classList.remove('hidden');
            }
        };
        reader.readAsDataURL(file);
        
        // رفع الملف
        adminAPI.uploadFile(file, { folder: 'cars' })
            .then((response) => {
                if (onSuccess) {
                    onSuccess(response);
                }
                AdminUtils.showToast('تم رفع الصورة بنجاح', 'success');
            })
            .catch((error) => {
                if (onError) {
                    onError(error);
                }
                AdminUtils.showToast('فشل رفع الصورة', 'error');
            });
    },

    confirmAction(message, onConfirm, onCancel) {
        const modal = AdminUtils.createModal({
            title: 'تأكيد الإجراء',
            content: message,
            buttons: [
                { text: 'إلغاء', type: 'secondary', action: () => {
                    if (onCancel) onCancel();
                    modal.remove();
                }},
                { text: 'تأكيد', type: 'danger', action: () => {
                    if (onConfirm) onConfirm();
                    modal.remove();
                }}
            ]
        });
    }
};