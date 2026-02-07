// ملف JavaScript الرئيسي لوحة التحكم

class AdminDashboard {
    constructor() {
        this.currentUser = null;
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCurrentUser();
        this.applyDarkMode();
        this.applySidebarState();
        this.setupDataTables();
        this.setupCharts();
        this.setupNotifications();
        this.checkSession();
        this.loadStatistics();
    }

    setupEventListeners() {
        // تبديل الشريط الجانبي
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // القوائم المنسدلة
        this.setupDropdowns();
        
        // الوضع الليلي
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // الإشعارات
        const notificationsBtn = document.getElementById('notificationsBtn');
        const headerNotifications = document.getElementById('headerNotifications');
        
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNotifications();
            });
        }
        
        if (headerNotifications) {
            headerNotifications.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleHeaderNotifications();
            });
        }

        // الملف الشخصي
        const profileDropdownBtn = document.getElementById('profileDropdownBtn');
        if (profileDropdownBtn) {
            profileDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleProfileDropdown();
            });
        }

        // تسجيل الخروج
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // إغلاق القوائم عند النقر خارجها
        document.addEventListener('click', () => {
            this.closeAllDropdowns();
        });

        // تحديث الإحصائيات كل 30 ثانية
        setInterval(() => {
            this.updateLiveStats();
        }, 30000);

        // تحميل الإحصائيات عند فتح الصفحة
        window.addEventListener('load', () => {
            this.loadStatistics();
        });
    }

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.sidebar-dropdown button');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
                const menu = dropdown.nextElementSibling;
                const icon = dropdown.querySelector('.fa-chevron-down');
                
                menu.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });
    }

    setupDataTables() {
        const tables = document.querySelectorAll('.data-table');
        tables.forEach(table => {
            if ($.fn.DataTable.isDataTable(table)) {
                return;
            }
            
            $(table).DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json'
                },
                pageLength: 25,
                responsive: true,
                order: [[0, 'desc']],
                dom: '<"flex justify-between items-center mb-4"<"flex items-center"l><"flex items-center"f>>rt<"flex justify-between items-center mt-4"<"flex items-center"i><"flex items-center"p>>',
                initComplete: function() {
                    this.api().columns().every(function() {
                        const column = this;
                        const header = $(column.header());
                        
                        if (header.data('filter')) {
                            const select = $('<select><option value="">الكل</option></select>')
                                .appendTo(header)
                                .on('change', function() {
                                    const val = $.fn.dataTable.util.escapeRegex($(this).val());
                                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                                });
                            
                            column.data().unique().sort().each(function(d, j) {
                                select.append('<option value="' + d + '">' + d + '</option>');
                            });
                        }
                    });
                }
            });
        });
    }

    setupCharts() {
        // هذا سيتم تفعيله في الصفحات التي تحتوي على مخططات
        console.log('Charts setup ready');
    }

    setupNotifications() {
        // محاكاة إشعارات حية
        setInterval(() => {
            this.checkNewNotifications();
        }, 60000);
    }

    loadCurrentUser() {
        const userData = localStorage.getItem('adminUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUserInfo();
        } else {
            // محاكاة بيانات المستخدم للعرض
            this.currentUser = {
                name: 'أحمد المشرف',
                email: 'admin@example.com',
                role: 'المشرف الرئيسي',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            };
        }
    }

    updateUserInfo() {
        const userElements = document.querySelectorAll('.current-user-name');
        const avatarElements = document.querySelectorAll('.current-user-avatar');
        
        userElements.forEach(el => {
            if (this.currentUser.name) {
                el.textContent = this.currentUser.name;
            }
        });
        
        avatarElements.forEach(el => {
            if (this.currentUser.avatar) {
                el.src = this.currentUser.avatar;
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        
        this.sidebarCollapsed = !this.sidebarCollapsed;
        localStorage.setItem('sidebarCollapsed', this.sidebarCollapsed);
        
        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.style.marginRight = '80px';
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.style.marginRight = '280px';
        }
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }

    applySidebarState() {
        if (this.sidebarCollapsed) {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.querySelector('.main-content');
            
            if (sidebar && mainContent) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginRight = '80px';
            }
        }
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode);
        this.applyDarkMode();
    }

    applyDarkMode() {
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    toggleNotifications() {
        const dropdown = document.getElementById('notificationsDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    toggleHeaderNotifications() {
        const dropdown = document.getElementById('notificationsDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    toggleProfileDropdown() {
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
    }

    checkSession() {
        const lastActivity = localStorage.getItem('lastActivity');
        const now = Date.now();
        
        if (lastActivity && now - lastActivity > 30 * 60 * 1000) {
            // انتهت الجلسة بعد 30 دقيقة
            this.showSessionWarning();
        }
        
        localStorage.setItem('lastActivity', now);
        
        // تحديث آخر نشاط كل دقيقة
        setInterval(() => {
            localStorage.setItem('lastActivity', Date.now());
        }, 60000);
    }

    showSessionWarning() {
        const modal = this.createModal({
            title: 'تحذير انتهاء الجلسة',
            content: 'جلسة العمل الخاصة بك على وشك الانتهاء. هل ترغب في تمديدها؟',
            buttons: [
                { text: 'تمديد الجلسة', type: 'primary', action: () => {
                    localStorage.setItem('lastActivity', Date.now());
                    modal.remove();
                }},
                { text: 'تسجيل الخروج', type: 'danger', action: () => {
                    this.logout();
                }}
            ]
        });
    }

    loadStatistics() {
        // محاكاة تحميل الإحصائيات
        this.updateStatistics({
            totalCars: 2847,
            totalUsers: 15247,
            totalSales: 892,
            totalRevenue: 4200000,
            pendingReviews: 45,
            newUsers: 243,
            newReports: 12
        });
    }

    updateStatistics(stats) {
        // تحديث عناصر الإحصائيات في الواجهة
        const statElements = {
            'total-cars': stats.totalCars,
            'total-users': stats.totalUsers,
            'total-sales': stats.totalSales,
            'total-revenue': stats.totalRevenue,
            'pending-reviews': stats.pendingReviews,
            'new-users': stats.newUsers,
            'new-reports': stats.newReports
        };
        
        Object.entries(statElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                const oldValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
                this.animateCounter(element, oldValue, value);
            }
        });
    }

    animateCounter(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }

    updateLiveStats() {
        // محاكاة تحديث الإحصائيات الحية
        const randomIncrement = Math.floor(Math.random() * 10);
        
        const currentCars = parseInt(document.getElementById('total-cars')?.textContent.replace(/,/g, '')) || 2847;
        const currentUsers = parseInt(document.getElementById('total-users')?.textContent.replace(/,/g, '')) || 15247;
        
        this.updateStatistics({
            totalCars: currentCars + randomIncrement,
            totalUsers: currentUsers + randomIncrement * 2,
            totalSales: 892 + Math.floor(randomIncrement / 2),
            totalRevenue: 4200000 + randomIncrement * 1000
        });
    }

    checkNewNotifications() {
        // محاكاة فحص الإشعارات الجديدة
        const hasNewNotifications = Math.random() > 0.5;
        
        if (hasNewNotifications) {
            this.showNotification('إشعار جديد', 'تم استلام إشعار جديد في النظام', 'info');
            this.updateNotificationBadge();
        }
    }

    updateNotificationBadge() {
        const badges = document.querySelectorAll('.notification-badge');
        badges.forEach(badge => {
            let count = parseInt(badge.textContent) || 0;
            count++;
            badge.textContent = count;
            badge.classList.remove('hidden');
        });
    }

    showNotification(title, message, type = 'info') {
        const notification = this.createNotification(title, message, type);
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    createNotification(title, message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <strong>${title}</strong>
                <button class="close-notification">&times;</button>
            </div>
            <div class="notification-body">${message}</div>
        `;
        
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
        
        return notification;
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    createModal(options) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${options.title}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">${options.content}</div>
                <div class="modal-footer">
                    ${options.buttons.map(btn => `
                        <button class="btn-admin-${btn.type}">${btn.text}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        options.buttons.forEach((btn, index) => {
            modal.querySelectorAll('.modal-footer button')[index].addEventListener('click', btn.action);
        });
        
        return modal;
    }

    logout() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            localStorage.removeItem('adminUser');
            localStorage.removeItem('lastActivity');
            window.location.href = 'index.html';
        }
    }
}

// تهيئة لوحة التحكم
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});

// دوال مساعدة عالمية
window.AdminUtils = {
    formatDate(date) {
        return new Date(date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    formatCurrency(amount) {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'SAR'
        }).format(amount);
    },

    formatNumber(number) {
        return new Intl.NumberFormat('ar-SA').format(number);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    truncateText(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('تم النسخ إلى الحافظة', 'success');
        }).catch(() => {
            this.showToast('فشل النسخ', 'error');
        });
    },

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePhone(phone) {
        const re = /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
        return re.test(phone);
    },

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    getQueryParams() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
        return params;
    },

    setQueryParams(params) {
        const query = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        window.history.replaceState({}, '', `?${query}`);
    },

    downloadCSV(data, filename) {
        const csv = this.convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    convertToCSV(data) {
        if (!data.length) return '';
        
        const headers = Object.keys(data[0]);
        const rows = data.map(row => 
            headers.map(header => 
                JSON.stringify(row[header], (key, value) => 
                    value === null ? '' : value
                )
            ).join(',')
        );
        
        return [headers.join(','), ...rows].join('\n');
    },

    uploadFile(file, options = {}) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            
            if (options.folder) {
                formData.append('folder', options.folder);
            }
            
            fetch('/api/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data.error);
                }
            })
            .catch(reject);
        });
    },

    exportTableToExcel(tableId, filename) {
        const table = document.getElementById(tableId);
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    },

    printElement(elementId) {
        const element = document.getElementById(elementId);
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <html dir="rtl">
                <head>
                    <title>طباعة</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                        @media print {
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    ${element.innerHTML}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    },

    getFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    getTimeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const seconds = Math.floor((now - past) / 1000);
        
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return `قبل ${interval} سنة`;
        
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return `قبل ${interval} شهر`;
        
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return `قبل ${interval} يوم`;
        
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return `قبل ${interval} ساعة`;
        
        interval = Math.floor(seconds / 60);
        if (interval > 1) return `قبل ${interval} دقيقة`;
        
        return 'الآن';
    }
};