// ملف JavaScript لصفحة السيارات
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة select2 للفلاتر
    $('#year-select').select2({
        placeholder: "اختر السنة",
        allowClear: true
    });
    
    // عرض السيارات
    displayCars();
    
    // تحديث عرض السعر
    const priceSlider = document.getElementById('price-slider');
    const minPriceDisplay = document.getElementById('min-price');
    const maxPriceDisplay = document.getElementById('max-price');
    
    if (priceSlider && minPriceDisplay && maxPriceDisplay) {
        function updatePriceDisplay() {
            const maxPrice = parseInt(priceSlider.max);
            const currentValue = parseInt(priceSlider.value);
            minPriceDisplay.textContent = '0';
            maxPriceDisplay.textContent = formatNumber(currentValue);
            
            // تحديث التدرج
            const percentage = (currentValue / maxPrice) * 100;
            priceSlider.style.background = `linear-gradient(to right, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%)`;
        }
        
        priceSlider.addEventListener('input', updatePriceDisplay);
        updatePriceDisplay();
    }
    
    // تبديل بين عرض الشبكة والقائمة
    const viewButtons = document.querySelectorAll('[data-view]');
    const gridContainer = document.getElementById('cars-container');
    const listContainer = document.getElementById('cars-list-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // تحديث الأزرار النشطة
            viewButtons.forEach(btn => {
                btn.classList.remove('active-view', 'bg-blue-50', 'text-blue-600');
                btn.classList.add('text-gray-600');
            });
            this.classList.add('active-view', 'bg-blue-50', 'text-blue-600');
            
            // تبديل العرض
            if (view === 'grid') {
                gridContainer.classList.remove('hidden');
                listContainer.classList.add('hidden');
            } else {
                gridContainer.classList.add('hidden');
                listContainer.classList.remove('hidden');
                displayCarsListView();
            }
        });
    });
});

// عرض السيارات في شكل شبكة
function displayCars() {
    const container = document.getElementById('cars-container');
    if (!container) return;
    
    let html = '';
    carsData.forEach(car => {
        html += generateCarCard(car);
    });
    
    container.innerHTML = html;
    addCarCardEffects();
}

// عرض السيارات في شكل قائمة
function displayCarsListView() {
    const container = document.getElementById('cars-list-view');
    if (!container) return;
    
    let html = '';
    carsData.forEach(car => {
        html += `
        <div class="car-item bg-white">
            <div class="w-64 h-48 flex-shrink-0">
                <img src="${car.image}" alt="${car.title}" 
                     class="w-full h-full object-cover rounded-lg">
            </div>
            <div class="flex-grow">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">${car.title}</h3>
                        <div class="flex items-center text-gray-600 mb-2">
                            <i class="fas fa-map-marker-alt ml-2"></i>
                            <span>${car.location}</span>
                            <span class="mx-3">•</span>
                            <i class="fas fa-tachometer-alt ml-2"></i>
                            <span>${formatMileage(car.mileage)}</span>
                            <span class="mx-3">•</span>
                            <i class="fas fa-calendar ml-2"></i>
                            <span>${car.year}</span>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-blue-600">${formatPrice(car.price)}</div>
                </div>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${car.features.slice(0, 4).map(feature => `
                        <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">${feature}</span>
                    `).join('')}
                </div>
                
                <p class="text-gray-600 mb-4 line-clamp-2">${car.description.substring(0, 150)}...</p>
                
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <div class="flex items-center mr-4">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span>${car.rating}</span>
                            <span class="text-gray-500 mr-2">(${formatMileage(car.views)} مشاهدة)</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-gas-pump text-gray-500 ml-2"></i>
                            <span class="text-gray-600">${car.fuelType}</span>
                        </div>
                    </div>
                    <div>
                        <a href="car-details.html?id=${car.id}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                            <i class="fas fa-eye ml-2"></i>عرض التفاصيل
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// إنشاء بطاقة سيارة
function generateCarCard(car) {
    const isFavorite = checkIfFavorite(car.id);
    
    return `
    <div class="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
        <div class="relative overflow-hidden h-48">
            <img src="${car.image}" alt="${car.title}" 
                 class="w-full h-full object-cover hover:scale-110 transition duration-700">
            
            <!-- الشارات -->
            <div class="absolute top-4 right-4 flex flex-col space-y-2">
                ${car.featured ? `
                <span class="badge badge-featured">
                    <i class="fas fa-crown ml-1"></i> مميزة
                </span>` : ''}
                
                ${car.tags.slice(0, 2).map(tag => `
                    <span class="badge ${tag === 'جديد' ? 'badge-premium' : 'badge-new'}">
                        ${tag}
                    </span>
                `).join('')}
            </div>
            
            <!-- زر المفضلة -->
            <button class="favorite-btn absolute top-4 left-4 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    data-car-id="${car.id}"
                    title="${isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}">
                <i class="${isFavorite ? 'fas text-red-500' : 'far'} fa-heart"></i>
            </button>
            
            <!-- البائع -->
            <div class="absolute bottom-4 right-4">
                <div class="flex items-center bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    <i class="fas ${car.sellerType === 'تاجر' ? 'fa-store' : 'fa-user'} ml-2"></i>
                    <span>${car.sellerType}</span>
                </div>
            </div>
        </div>
        
        <div class="p-6">
            <!-- العنوان -->
            <h3 class="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition cursor-pointer truncate">
                ${car.title}
            </h3>
            
            <!-- الموقع والتقييم -->
            <div class="flex items-center text-gray-600 mb-4">
                <div class="flex items-center flex-grow">
                    <i class="fas fa-map-marker-alt ml-2"></i>
                    <span class="truncate">${car.location}</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                    <span class="font-bold">${car.rating}</span>
                </div>
            </div>
            
            <!-- المواصفات السريعة -->
            <div class="grid grid-cols-2 gap-3 mb-6">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center ml-2">
                        <i class="fas fa-tachometer-alt text-blue-600"></i>
                    </div>
                    <div class="mr-2">
                        <div class="text-xs text-gray-500">المسافة</div>
                        <div class="font-bold">${formatMileage(car.mileage)}</div>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center ml-2">
                        <i class="fas fa-cog text-blue-600"></i>
                    </div>
                    <div class="mr-2">
                        <div class="text-xs text-gray-500">الناقل</div>
                        <div class="font-bold">${car.transmission}</div>
                    </div>
                </div>
            </div>
            
            <!-- الميزات -->
            <div class="mb-6">
                <div class="text-sm text-gray-500 mb-2">المميزات:</div>
                <div class="flex flex-wrap gap-2">
                    ${car.features.slice(0, 3).map(feature => `
                        <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs truncate">
                            ${feature}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <!-- السعر والزر -->
            <div class="flex justify-between items-center pt-4 border-t">
                <div>
                    <div class="text-2xl font-bold text-blue-600">${formatPrice(car.price)}</div>
                    <div class="text-gray-500 text-sm">${formatMileage(car.views)} مشاهدة</div>
                </div>
                <a href="car-details.html?id=${car.id}" 
                   class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-xl transition-all duration-300">
                    <i class="fas fa-eye ml-2"></i>عرض
                </a>
            </div>
        </div>
    </div>
    `;
}

// إضافة تأثيرات لبطاقات السيارات
function addCarCardEffects() {
    const carCards = document.querySelectorAll('.card-hover');
    
    carCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('img');
            const button = this.querySelector('a');
            
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            
            if (button) {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('img');
            const button = this.querySelector('a');
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            if (button) {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            }
        });
    });
}

// دوال مساعدة
function checkIfFavorite(carId) {
    const favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    return favorites.includes(carId);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}