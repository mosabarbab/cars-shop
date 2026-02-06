// ملف JavaScript لصفحة تفاصيل السيارة
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على معرّف السيارة من URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));
    
    // البحث عن السيارة في البيانات
    const car = carsData.find(c => c.id === carId);
    
    // إذا لم يتم العثور على السيارة
    if (!car) {
        window.location.href = 'cars.html';
        return;
    }
    
    // تعبئة بيانات السيارة
    populateCarDetails(car);
    
    // تهيئة معرض الصور (Swiper)
    initializeImageGallery(car);
    
    // عرض سيارات مشابهة
    displaySimilarCars(car);
    
    // أحداث الأزرار
    setupEventListeners(car);
});

// تعبئة بيانات السيارة في الصفحة
function populateCarDetails(car) {
    // تحديث العناوين
    document.title = `${car.title} - سيارات.com`;
    document.getElementById('car-title-breadcrumb').textContent = car.title;
    document.getElementById('car-main-title').textContent = car.title;
    document.getElementById('car-details-title').textContent = car.title;
    
    // تحديث المعلومات الأساسية
    document.getElementById('car-price').textContent = `${car.price.toLocaleString()} ر.س`;
    document.getElementById('car-location').textContent = car.location;
    document.getElementById('car-year').textContent = car.year;
    document.getElementById('car-mileage').textContent = `${car.mileage.toLocaleString()} كم`;
    document.getElementById('car-fuel').textContent = car.fuelType;
    document.getElementById('car-transmission').textContent = car.transmission;
    
    // تحديث المواصفات
    const specsContainer = document.getElementById('car-specs');
    const specs = [
        { icon: 'fas fa-car', label: 'الماركة', value: getBrandFromTitle(car.title) },
        { icon: 'fas fa-cog', label: 'الموديل', value: getModelFromTitle(car.title) },
        { icon: 'fas fa-palette', label: 'اللون', value: getRandomColor() },
        { icon: 'fas fa-chair', label: 'المقاعد', value: '5 مقاعد' },
        { icon: 'fas fa-gas-pump', label: 'استهلاك الوقود', value: '10 لتر/100كم' },
        { icon: 'fas fa-oil-can', label: 'حالة السيارة', value: 'جيدة جداً' }
    ];
    
    specsContainer.innerHTML = specs.map(spec => `
        <li class="flex justify-between items-center">
            <div class="flex items-center">
                <i class="${spec.icon} text-blue-500 ml-3"></i>
                <span>${spec.label}</span>
            </div>
            <span class="font-medium">${spec.value}</span>
        </li>
    `).join('');
    
    // تحديث الوصف
    const description = `هذه السيارة ${car.title} بحالة ممتازة وصيانة دورية في الوكالة. 
    السيارة مجهزة بكافة وسائل الراحة والأمان. المسافة المقطوعة ${car.mileage.toLocaleString()} كم. 
    لا يوجد أي حوادث أو صدمات. الفحص والكشف متاح في أي وقت.`;
    
    document.getElementById('car-description').textContent = description;
}

// تهيئة معرض الصور
function initializeImageGallery(car) {
    const imagesContainer = document.getElementById('car-images-container');
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    
    // إنشاء مجموعة من الصور (في الواقع سيكون لديك مجموعة صور للسيارة)
    const carImages = [
        car.image,
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    ];
    
    // إضافة الصور إلى المعرض الرئيسي
    imagesContainer.innerHTML = carImages.map((img, index) => `
        <div class="swiper-slide">
            <img src="${img}" alt="${car.title} - صورة ${index + 1}" class="rounded-lg">
        </div>
    `).join('');
    
    // إضافة الصور المصغرة
    thumbnailsContainer.innerHTML = carImages.map((img, index) => `
        <div class="cursor-pointer overflow-hidden rounded">
            <img src="${img}" alt="صورة مصغرة ${index + 1}" class="w-full h-20 object-cover hover:opacity-75 transition-opacity">
        </div>
    `).join('');
    
    // تهيئة Swiper
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
    
    // إضافة أحداث النقر للصور المصغرة
    const thumbnails = document.querySelectorAll('#thumbnails-container img');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            swiper.slideTo(index + 1); // +1 لأن loop تضيف slide إضافية
        });
    });
}

// عرض سيارات مشابهة
function displaySimilarCars(currentCar) {
    const similarCarsContainer = document.getElementById('similar-cars');
    
    // تصفية السيارات المشابهة (نفس الماركة أو نفس نطاق السعر)
    const similarCars = carsData
        .filter(car => car.id !== currentCar.id)
        .filter(car => {
            const sameBrand = getBrandFromTitle(car.title) === getBrandFromTitle(currentCar.title);
            const similarPrice = Math.abs(car.price - currentCar.price) < 50000;
            return sameBrand || similarPrice;
        })
        .slice(0, 4); // عرض 4 سيارات كحد أقصى
    
    if (similarCars.length === 0) {
        similarCarsContainer.innerHTML = `
            <div class="col-span-4 text-center py-8">
                <p class="text-gray-600">لا توجد سيارات مشابهة حالياً</p>
            </div>
        `;
        return;
    }
    
    // عرض السيارات المشابهة
    similarCarsContainer.innerHTML = similarCars.map(car => `
        <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <img src="${car.image}" alt="${car.title}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h4 class="font-bold mb-1">${car.title}</h4>
                <div class="flex items-center text-gray-600 text-sm mb-2">
                    <i class="fas fa-map-marker-alt ml-1"></i>
                    <span>${car.location}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-blue-600">${car.price.toLocaleString()} ر.س</span>
                    <a href="car-details.html?id=${car.id}" class="text-blue-600 hover:text-blue-800 text-sm">
                        التفاصيل <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// إعداد أحداث الأزرار
function setupEventListeners(car) {
    // زر الاتصال الفوري
    const contactBtn = document.getElementById('contact-seller-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            window.location.href = `tel:+966501234567`;
        });
    }
    
    // زر الواتساب
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const message = `مرحباً، أنا مهتم بالسيارة ${car.title} بسعر ${car.price.toLocaleString()} ريال`;
            const url = `https://wa.me/966501234567?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }
    
    // زر المفضلة
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            const favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
            const heartIcon = favoriteBtn.querySelector('i');
            
            if (favorites.includes(car.id)) {
                // إزالة من المفضلة
                const index = favorites.indexOf(car.id);
                favorites.splice(index, 1);
                heartIcon.classList.remove('fas', 'text-red-500');
                heartIcon.classList.add('far');
                showNotification('تمت إزالة السيارة من المفضلة', 'info');
            } else {
                // إضافة إلى المفضلة
                favorites.push(car.id);
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas', 'text-red-500');
                showNotification('تمت إضافة السيارة إلى المفضلة', 'success');
            }
            
            localStorage.setItem('favoriteCars', JSON.stringify(favorites));
        });
        
        // التحقق مما إذا كانت السيارة في المفضلة
        const favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
        const heartIcon = favoriteBtn.querySelector('i');
        if (favorites.includes(car.id)) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas', 'text-red-500');
        }
    }
    
    // زر المشاركة
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const shareData = {
                title: car.title,
                text: `شاهد ${car.title} بسعر ${car.price.toLocaleString()} ريال`,
                url: window.location.href
            };
            
            if (navigator.share) {
                navigator.share(shareData);
            } else {
                // نسخ الرابط إذا لم يكن Share API متاحاً
                navigator.clipboard.writeText(window.location.href);
                showNotification('تم نسخ الرابط', 'success');
            }
        });
    }
    
    // نموذج الاتصال
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(this);
            const name = formData.get('name') || 'غير معروف';
            const email = formData.get('email');
            const message = formData.get('message');
            
            // هنا يمكنك إرسال البيانات إلى الخادم
            // في الوقت الحالي، سنعرض رسالة نجاح
            showNotification('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.', 'success');
            this.reset();
            
            // تسجيل الرسالة في localStorage (مؤقت)
            const messages = JSON.parse(localStorage.getItem('carMessages')) || [];
            messages.push({
                carId: car.id,
                carTitle: car.title,
                name: name,
                email: email,
                message: message,
                date: new Date().toISOString()
            });
            localStorage.setItem('carMessages', JSON.stringify(messages));
        });
    }
}

// دوال مساعدة
function getBrandFromTitle(title) {
    const brands = ['تويوتا', 'هيونداي', 'بي إم دبليو', 'مرسيدس', 'كيا', 'نيسان'];
    for (const brand of brands) {
        if (title.includes(brand)) {
            return brand;
        }
    }
    return 'غير معروف';
}

function getModelFromTitle(title) {
    // استخراج الموديل من العنوان
    const parts = title.split(' ');
    return parts.length > 2 ? parts[parts.length - 2] : 'غير معروف';
}

function getRandomColor() {
    const colors = ['أبيض', 'أسود', 'فضي', 'رمادي', 'أزرق', 'أحمر'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showNotification(message, type = 'info') {
    // نفس دالة الإشعارات في main.js
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