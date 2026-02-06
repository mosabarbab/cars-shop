// وظائف التصفية والبحث مع تأثيرات تفاعلية
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة AOS
    AOS.init({
        duration: 800,
        once: true
    });
    
    // عناصر التصفية
    const priceSlider = document.getElementById('price-range');
    const minPriceDisplay = document.getElementById('min-price');
    const maxPriceDisplay = document.getElementById('max-price');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-by');
    const carsList = document.getElementById('cars-list');
    
    // تحديث عرض نطاق السعر مع تأثيرات
    if (priceSlider && minPriceDisplay && maxPriceDisplay) {
        function updatePriceDisplay() {
            const maxPrice = parseInt(priceSlider.max);
            const currentValue = parseInt(priceSlider.value);
            minPriceDisplay.textContent = '0';
            maxPriceDisplay.textContent = formatNumber(currentValue);
            
            // تأثير تدرج اللون
            const percentage = (currentValue / maxPrice) * 100;
            priceSlider.style.background = `linear-gradient(to right, #667eea ${percentage}%, #d1d5db ${percentage}%)`;
            
            // تأثير الرجوع
            maxPriceDisplay.style.transform = 'scale(1.1)';
            setTimeout(() => {
                maxPriceDisplay.style.transform = 'scale(1)';
            }, 200);
        }
        
        priceSlider.addEventListener('input', updatePriceDisplay);
        priceSlider.addEventListener('change', updatePriceDisplay);
        updatePriceDisplay();
    }
    
    // عرض جميع السيارات مع تأثيرات
    function displayAllCars() {
        if (!carsList) return;
        
        let html = '';
        carsData.forEach((car, index) => {
            html += generateCarCard(car, index);
        });
        
        carsList.innerHTML = html;
        updateCarCount(carsData.length);
        addCarCardEffects();
    }
    
    // إنشاء بطاقة سيارة بتأثيرات
    function generateCarCard(car, index) {
        // التحقق مما إذا كانت السيارة في المفضلة
        const favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
        const isFavorite = favorites.includes(car.id);
        
        // تأخير ظهور الكارد
        const delay = (index % 6) * 100;
        
        return `
        <div class="car-card opacity-0 transform translate-y-10" 
             data-aos="fade-up" 
             data-aos-delay="${delay}"
             data-car-id="${car.id}">
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
                <div class="relative overflow-hidden h-56">
                    <img src="${car.image}" alt="${car.title}" 
                         class="w-full h-full object-cover car-image-hover"
                         loading="lazy">
                    
                    <!-- شارة مميزة -->
                    ${car.featured ? `
                    <div class="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        <i class="fas fa-crown mr-1"></i> مميزة
                    </div>` : ''}
                    
                    <!-- زر المفضلة -->
                    <button class="favorite-btn absolute top-4 right-4 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                            data-car-id="${car.id}"
                            title="${isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}">
                        <i class="${isFavorite ? 'fas text-red-500' : 'far'} fa-heart transition-all duration-300"></i>
                    </button>
                    
                    <!-- تدرج الألوان -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div class="p-6">
                    <!-- العنوان والموقع -->
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-bold text-gray-800 hover:text-blue-600 transition cursor-pointer">${car.title}</h3>
                        <span class="bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm">${car.year}</span>
                    </div>
                    
                    <!-- الموقع والتقييم -->
                    <div class="flex items-center text-gray-600 mb-4">
                        <i class="fas fa-map-marker-alt ml-2 text-blue-500"></i>
                        <span class="mr-2">${car.location}</span>
                        <span class="mx-2">•</span>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span>${car.rating}</span>
                            <span class="mr-2 text-gray-400">(${car.views.toLocaleString()})</span>
                        </div>
                    </div>
                    
                    <!-- الميزات -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${car.features.slice(0, 4).map(feature => `
                            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-blue-100 hover:text-blue-600 transition">${feature}</span>
                        `).join('')}
                    </div>
                    
                    <!-- المواصفات -->
                    <div class="grid grid-cols-2 gap-3 mb-6">
                        <div class="flex items-center bg-gray-50 p-2 rounded-lg">
                            <i class="fas fa-tachometer-alt text-blue-500 ml-2"></i>
                            <span class="text-sm">${car.mileage.toLocaleString()} كم</span>
                        </div>
                        <div class="flex items-center bg-gray-50 p-2 rounded-lg">
                            <i class="fas fa-gas-pump text-blue-500 ml-2"></i>
                            <span class="text-sm">${car.fuelType}</span>
                        </div>
                    </div>
                    
                    <!-- السعر والزر -->
                    <div class="flex justify-between items-center pt-4 border-t">
                        <div>
                            <div class="text-2xl font-bold text-blue-600">${car.price.toLocaleString()} ر.س</div>
                            <div class="text-gray-500 text-sm">${car.transmission}</div>
                        </div>
                        <a href="car-details.html?id=${car.id}" 
                           class="btn-gradient text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                            <i class="fas fa-arrow-left ml-2"></i> التفاصيل
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    // إضافة تأثيرات لبطاقات السيارات
    function addCarCardEffects() {
        const carCards = document.querySelectorAll('.car-card');
        
        carCards.forEach(card => {
            // تأثير الظهور
            setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-10');
                card.classList.add('opacity-100', 'translate-y-0');
            }, 100);
            
            // تأثيرات عند المرور
            card.addEventListener('mouseenter', function() {
                const image = this.querySelector('img');
                const button = this.querySelector('.btn-gradient');
                
                if (image) image.style.transform = 'scale(1.05)';
                if (button) {
                    button.style.transform = 'translateX(-5px)';
                    button.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const image = this.querySelector('img');
                const button = this.querySelector('.btn-gradient');
                
                if (image) image.style.transform = 'scale(1)';
                if (button) {
                    button.style.transform = 'translateX(0)';
                    button.style.boxShadow = 'none';
                }
            });
        });
    }
    
    // تطبيق الفلاتر مع تأثيرات
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // تأثير النقر
            this.classList.add('scale-95');
            setTimeout(() => {
                this.classList.remove('scale-95');
            }, 150);
            
            const maxPrice = parseInt(priceSlider.value);
            const selectedYear = document.getElementById('year-filter')?.value || '';
            
            // جمع أنواع الوقود المحددة
            const fuelCheckboxes = document.querySelectorAll('input[name="fuel"]:checked');
            const selectedFuels = Array.from(fuelCheckboxes).map(cb => cb.value);
            
            // جمع أنواع الناقل المحددة
            const transmissionCheckboxes = document.querySelectorAll('input[name="transmission"]:checked');
            const selectedTransmissions = Array.from(transmissionCheckboxes).map(cb => cb.value);
            
            // تصفية السيارات
            let filteredCars = carsData.filter(car => {
                // فلترة السعر
                if (car.price > maxPrice) return false;
                
                // فلترة السنة
                if (selectedYear && car.year != selectedYear) return false;
                
                // فلترة الوقود
                if (selectedFuels.length > 0 && !selectedFuels.includes(car.fuelType)) return false;
                
                // فلترة الناقل
                if (selectedTransmissions.length > 0 && !selectedTransmissions.includes(car.transmission)) return false;
                
                return true;
            });
            
            // عرض السيارات المصفاة مع تأثيرات
            displayFilteredCars(filteredCars);
            
            // تأثير نجاح التصفية
            showNotification(`تم العثور على ${filteredCars.length} سيارة`, 'success');
        });
    }
    
    // إعادة تعيين الفلاتر مع تأثيرات
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // تأثير النقر
            this.classList.add('scale-95');
            setTimeout(() => {
                this.classList.remove('scale-95');
            }, 150);
            
            priceSlider.value = priceSlider.max;
            if (document.getElementById('year-filter')) {
                document.getElementById('year-filter').value = '';
            }
            
            // إلغاء تحديد جميع الخيارات
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            
            displayAllCars();
            updatePriceDisplay();
            
            // تأثير إعادة التعيين
            showNotification('تم إعادة تعيين جميع الفلاتر', 'info');
        });
    }
    
    // ترتيب السيارات مع تأثيرات
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedCars = [...carsData];
            
            switch(sortValue) {
                case 'price-low':
                    sortedCars.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedCars.sort((a, b) => b.price - a.price);
                    break;
                case 'year':
                    sortedCars.sort((a, b) => b.year - a.year);
                    break;
                case 'views':
                    sortedCars.sort((a, b) => b.views - a.views);
                    break;
                case 'rating':
                    sortedCars.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    sortedCars.sort((a, b) => b.id - a.id);
            }
            
            displaySortedCars(sortedCars);
            
            // تأثير تغيير الترتيب
            showNotification(`تم الترتيب حسب: ${this.options[this.selectedIndex].text}`, 'info');
        });
    }
    
    // دالة لعرض السيارات المصفاة مع تأثيرات
    function displayFilteredCars(filteredCars) {
        if (!carsList) return;
        
        if (filteredCars.length === 0) {
            carsList.innerHTML = `
                <div class="col-span-3 text-center py-16" data-aos="zoom-in">
                    <div class="floating mb-6">
                        <i class="fas fa-search text-6xl text-gray-300"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3 text-gray-700">لا توجد سيارات تطابق بحثك</h3>
                    <p class="text-gray-500 mb-8 max-w-md mx-auto">حاول تعديل معايير البحث للحصول على نتائج أفضل</p>
                    <button id="reset-filters-btn" class="btn-gradient text-white px-8 py-3 rounded-xl font-medium">
                        <i class="fas fa-redo mr-2"></i> إعادة تعيين الفلاتر
                    </button>
                </div>
            `;
            
            document.getElementById('reset-filters-btn').addEventListener('click', () => {
                resetFiltersBtn.click();
            });
            
            updateCarCount(0);
            return;
        }
        
        let html = '';
        filteredCars.forEach((car, index) => {
            html += generateCarCard(car, index);
        });
        
        carsList.innerHTML = html;
        updateCarCount(filteredCars.length);
        addCarCardEffects();
    }
    
    // دالة لعرض السيارات المرتبة
    function displaySortedCars(sortedCars) {
        displayFilteredCars(sortedCars);
    }
    
    // تحديث عدد السيارات المعروضة
    function updateCarCount(count) {
        const countElements = document.querySelectorAll('.car-count');
        countElements.forEach(el => {
            el.textContent = formatNumber(count);
            
            // تأثير تحديث العدد
            el.classList.add('scale-125');
            setTimeout(() => {
                el.classList.remove('scale-125');
            }, 300);
        });
    }
    
    // تنسيق الأرقام
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // تهيئة الصفحة بعرض جميع السيارات
    setTimeout(() => {
        displayAllCars();
    }, 300);
    
    // إضافة تأثيرات للعناصر الجديدة عند التمرير
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // مراقبة ظهور السيارات الجديدة
    document.querySelectorAll('.car-card').forEach(card => {
        observer.observe(card);
    });
});