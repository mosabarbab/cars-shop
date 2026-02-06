// ملف JavaScript للوحة التحكم
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة التنقل بين الأقسام
    setupSectionNavigation();
    
    // تحميل البيانات والإحصائيات
    loadDashboardData();
    
    // تحميل سيارات المستخدم
    loadUserCars();
    
    // تحميل الرسائل
    loadMessages();
    
    // تحميل السيارات المفضلة
    loadFavorites();
    
    // إعداد مخططات الإحصائيات
    setupCharts();
    
    // إعداد أحداث أخرى
    setupEventListeners();
});

// إعداد التنقل بين أقسام لوحة التحكم
function setupSectionNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على القسم المستهدف
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (!targetSection) return;
            
            // إخفاء جميع الأقسام
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // إزالة النشاط من جميع روابط الشريط الجانبي
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // إظهار القسم المستهدف
            targetSection.classList.add('active');
            this.classList.add('active');
            
            // تحميل بيانات القسم إذا لزم الأمر
            switch(targetId) {
                case 'my-cars':
                    loadUserCars();
                    break;
                case 'messages':
                    loadMessages();
                    break;
                case 'favorites':
                    loadFavorites();
                    break;
            }
        });
    });
}

// تحميل بيانات لوحة التحكم
function loadDashboardData() {
    // سيارات المستخدم
    const userCars = JSON.parse(localStorage.getItem('userCars')) || [];
    
    // الرسائل
    const messages = JSON.parse(localStorage.getItem('carMessages')) || [];
    const unreadMessages = messages.filter(msg => !msg.read).length;
    
    // السيارات المفضلة
    const favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    
    // تحديث الإحصائيات
    document.getElementById('active-cars').textContent = userCars.length;
    document.getElementById('cars-count').textContent = userCars.length;
    document.getElementById('unread-messages').textContent = unreadMessages;
    document.getElementById('messages-count').textContent = unreadMessages;
    
    // تحديث المشاهدات (محاكاة)
    const totalViews = userCars.reduce((sum, car) => sum + (car.views || 0), 0);
    document.getElementById('total-views').textContent = totalViews.toLocaleString();
    
    // تحديث السيارات المباعة (محاكاة)
    const soldCars = userCars.filter(car => car.status === 'sold').length;
    document.getElementById('sold-cars').textContent = soldCars;
    
    // عرض آخر الرسائل
    displayRecentMessages(messages);
}

// تحميل سيارات المستخدم
function loadUserCars() {
    const userCars = JSON.parse(localStorage.getItem('userCars')) || [];
    const tableBody = document.getElementById('user-cars-table');
    const noCarsMessage = document.getElementById('no-cars-message');
    
    if (userCars.length === 0) {
        tableBody.innerHTML = '';
        noCarsMessage.classList.remove('hidden');
        return;
    }
    
    noCarsMessage.classList.add('hidden');
    
    // عرض السيارات في الجدول
    let html = '';
    userCars.forEach((car, index) => {
        const status = car.status || 'pending';
        const statusText = getStatusText(status);
        const statusClass = getStatusClass(status);
        
        // محاكاة بعض البيانات
        const views = car.views || Math.floor(Math.random() * 100);
        const messagesCount = car.messages || Math.floor(Math.random() * 10);
        
        html += `
            <tr class="table-row">
                <td class="py-4 px-4">
                    <div class="flex items-center">
                        <img src="${car.images?.[0] || 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60'}" 
                             alt="${car.title}" class="w-16 h-12 object-cover rounded ml-4">
                        <div>
                            <div class="font-medium">${car.title}</div>
                            <div class="text-gray-600 text-sm">${car.year} • ${car.mileage.toLocaleString()} كم</div>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-4">
                    <div class="font-bold text-blue-600">${car.price.toLocaleString()} ر.س</div>
                </td>
                <td class="py-4 px-4">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td class="py-4 px-4">
                    <div class="flex items-center">
                        <i class="fas fa-eye text-gray-400 ml-2"></i>
                        <span>${views}</span>
                    </div>
                </td>
                <td class="py-4 px-4">
                    <div class="flex items-center">
                        <i class="fas fa-envelope text-gray-400 ml-2"></i>
                        <span>${messagesCount}</span>
                    </div>
                </td>
                <td class="py-4 px-4">
                    <div class="flex space-x-2">
                        <button class="edit-car-btn p-2 text-blue-600 hover:text-blue-800" data-index="${index}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-car-btn p-2 text-red-600 hover:text-red-800" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                        <a href="car-details.html?id=${car.id}" class="p-2 text-gray-600 hover:text-gray-800">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
    
    // إضافة أحداث لأزرار التصفية
    setupCarFilters();
    
    // إضافة أحداث لأزرار التعديل والحذف
    setupCarActions();
}

// تحميل الرسائل
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('carMessages')) || [];
    const messagesList = document.getElementById('messages-list');
    
    if (messages.length === 0) {
        messagesList.innerHTML = `
            <div class="p-12 text-center">
                <i class="fas fa-envelope text-4xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-bold mb-2">لا توجد رسائل</h3>
                <p class="text-gray-600">لم تتلق أي رسائل بعد</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    messages.forEach((msg, index) => {
        const car = carsData.find(c => c.id === msg.carId);
        const carTitle = car ? car.title : 'سيارة غير معروفة';
        const date = new Date(msg.date).toLocaleDateString('ar-SA');
        
        html += `
            <div class="p-4 hover:bg-gray-50 ${!msg.read ? 'bg-blue-50' : ''}">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                            <i class="fas fa-user text-blue-600"></i>
                        </div>
                        <div>
                            <div class="font-bold">${msg.name}</div>
                            <div class="text-gray-600 text-sm">بخصوص: ${carTitle}</div>
                        </div>
                    </div>
                    <div class="text-gray-500 text-sm">${date}</div>
                </div>
                <p class="text-gray-700 mb-3">${msg.message.substring(0, 150)}...</p>
                <div class="flex justify-between items-center">
                    <a href="mailto:${msg.email}" class="text-blue-600 hover:text-blue-800 font-medium">
                        <i class="fas fa-reply ml-2"></i> رد
                    </a>
                    <button class="delete-message-btn text-gray-500 hover:text-red-600 text-sm" data-index="${index}">
                        حذف
                    </button>
                </div>
            </div>
        `;
    });
    
    messagesList.innerHTML = html;
    
    // إضافة أحداث لحذف الرسائل
    document.querySelectorAll('.delete-message-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            deleteMessage(index);
        });
    });
}

// تحميل السيارات المفضلة
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    const container = document.getElementById('favorite-cars');
    const noFavoritesMessage = document.getElementById('no-favorites-message');
    
    if (favorites.length === 0) {
        container.innerHTML = '';
        noFavoritesMessage.classList.remove('hidden');
        return;
    }
    
    noFavoritesMessage.classList.add('hidden');
    
    // تصفية السيارات المفضلة من بيانات السيارات
    const favoriteCars = carsData.filter(car => favorites.includes(car.id));
    
    let html = '';
    favoriteCars.forEach(car => {
        html += `
            <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <img src="${car.image}" alt="${car.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold">${car.title}</h4>
                        <button class="remove-favorite-btn text-red-500 hover:text-red-700" data-car-id="${car.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="flex items-center text-gray-600 text-sm mb-3">
                        <i class="fas fa-map-marker-alt ml-1"></i>
                        <span>${car.location}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-blue-600">${car.price.toLocaleString()} ر.س</span>
                        <a href="car-details.html?id=${car.id}" class="text-blue-600 hover:text-blue-800 text-sm">
                            التفاصيل
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // إضافة أحداث لإزالة السيارات من المفضلة
    document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const carId = parseInt(this.dataset.carId);
            removeFromFavorites(carId);
        });
    });
}

// إعداد مخططات الإحصائيات
function setupCharts() {
    // مخطط المشاهدات
    const viewsCtx = document.getElementById('viewsChart').getContext('2d');
    new Chart(viewsCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'مشاهدات الإعلانات',
                data: [65, 78, 90, 82, 105, 120],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // مخطط حالة السيارات
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['معروضة', 'قيد المراجعة', 'مباعة'],
            datasets: [{
                data: [5, 2, 1],
                backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#6b7280'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// إعداد أحداث أخرى
function setupEventListeners() {
    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
                // في الواقع، هنا ستقوم بتنظيف بيانات الجلسة
                window.location.href = 'index.html';
            }
        });
    }
    
    // نماذج الأسئلة الشائعة
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                answer.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

// عرض آخر الرسائل
function displayRecentMessages(messages) {
    const container = document.getElementById('recent-messages');
    const recentMessages = messages.slice(0, 3); // آخر 3 رسائل
    
    if (recentMessages.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-envelope text-3xl mb-3"></i>
                <p>لا توجد رسائل جديدة</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    recentMessages.forEach(msg => {
        html += `
            <div class="flex items-center p-4 border-b last:border-b-0">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                    <i class="fas fa-user text-blue-600"></i>
                </div>
                <div class="flex-1">
                    <div class="font-bold">${msg.name}</div>
                    <div class="text-gray-600 text-sm truncate">${msg.message.substring(0, 50)}...</div>
                </div>
                <div class="text-gray-500 text-sm">${new Date(msg.date).toLocaleDateString('ar-SA')}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// إعداد تصفية السيارات
function setupCarFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tableRows = document.querySelectorAll('#user-cars-table tr');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const status = this.dataset.status;
            
            // تحديث حالة الأزرار
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('hover:bg-gray-100');
            });
            
            this.classList.remove('hover:bg-gray-100');
            this.classList.add('bg-blue-600', 'text-white');
            
            // تصفية الصفوف
            tableRows.forEach(row => {
                if (status === 'all') {
                    row.style.display = '';
                } else {
                    const statusBadge = row.querySelector('.status-badge');
                    const carStatus = getStatusFromBadge(statusBadge.textContent);
                    
                    if (carStatus === status) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    });
}

// إعداد إجراءات السيارات
function setupCarActions() {
    // أزرار التعديل
    document.querySelectorAll('.edit-car-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            editCar(index);
        });
    });
    
    // أزرار الحذف
    document.querySelectorAll('.delete-car-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            deleteCar(index);
        });
    });
}

// دوال مساعدة
function getStatusText(status) {
    const statusMap = {
        'active': 'معروضة',
        'pending': 'قيد المراجعة',
        'sold': 'مباعة'
    };
    return statusMap[status] || 'غير معروف';
}

function getStatusClass(status) {
    const classMap = {
        'active': 'status-active',
        'pending': 'status-pending',
        'sold': 'status-sold'
    };
    return classMap[status] || '';
}

function getStatusFromBadge(badgeText) {
    if (badgeText.includes('معروضة')) return 'active';
    if (badgeText.includes('المراجعة')) return 'pending';
    if (badgeText.includes('مباعة')) return 'sold';
    return '';
}

function editCar(index) {
    const userCars = JSON.parse(localStorage.getItem('userCars')) || [];
    const car = userCars[index];
    
    // في الواقع، هنا ستفتح نموذجاً لتعديل السيارة
    alert(`ستتمكن قريباً من تعديل السيارة: ${car.title}`);
}

function deleteCar(index) {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    
    const userCars = JSON.parse(localStorage.getItem('userCars')) || [];
    userCars.splice(index, 1);
    localStorage.setItem('userCars', JSON.stringify(userCars));
    
    // إعادة تحميل السيارات
    loadUserCars();
    loadDashboardData();
    
    showNotification('تم حذف السيارة بنجاح', 'success');
}

function deleteMessage(index) {
    if (!confirm('هل تريد حذف هذه الرسالة؟')) return;
    
    const messages = JSON.parse(localStorage.getItem('carMessages')) || [];
    messages.splice(index, 1);
    localStorage.setItem('carMessages', JSON.stringify(messages));
    
    // إعادة تحميل الرسائل
    loadMessages();
    loadDashboardData();
    
    showNotification('تم حذف الرسالة بنجاح', 'success');
}

function removeFromFavorites(carId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    favorites = favorites.filter(id => id !== carId);
    localStorage.setItem('favoriteCars', JSON.stringify(favorites));
    
    // إعادة تحميل المفضلة
    loadFavorites();
    
    showNotification('تمت إزالة السيارة من المفضلة', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}