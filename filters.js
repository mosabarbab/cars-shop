// ملف filters.js - إدارة الفلاتر والبحث مع تأثيرات متقدمة
class FiltersManager {
    constructor() {
        this.carsData = [];
        this.filteredCars = [];
        this.currentFilters = {
            price: { min: 0, max: 1000000 },
            year: [],
            brand: [],
            fuel: [],
            transmission: [],
            condition: [],
            mileage: { min: 0, max: 500000 },
            location: []
        };
        
        this.init();
    }

    init() {
        this.loadCarsData();
        this.setupFilters();
        this.setupSearch();
        this.setupAdvancedFilters();
        this.setupFilterAnimations();
    }

    loadCarsData() {
        // استيراد بيانات السيارات من ملف cars-data.js
        if (typeof carsData !== 'undefined') {
            this.carsData = carsData;
            this.filteredCars = [...carsData];
        } else {
            console.warn('بيانات السيارات غير متوفرة. جارٍ تحميل بيانات افتراضية...');
            this.loadDefaultData();
        }
    }

    loadDefaultData() {
        // بيانات افتراضية للاختبار
        this.carsData = [
            {
                id: 1,
                title: "تويوتا كامري 2023",
                price: 125000,
                year: 2023,
                mileage: 15000,
                fuelType: "بنزين",
                transmission: "أوتوماتيك",
                location: "الرياض",
                image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                featured: true
            },
            // إضافة المزيد من السيارات...
        ];
        this.filteredCars = [...this.carsData];
    }

    setupFilters() {
        // تهيئة أزرار الفلاتر السريعة
        this.setupQuickFilters();
        
        // تهيئة شريط السعر
        this.setupPriceFilter();
        
        // تهيئة فلترة السنة
        this.setupYearFilter();
        
        // تهيئة فلترة الماركة
        this.setupBrandFilter();
        
        // تهيئة الفلاتر الأخرى
        this.setupOtherFilters();
    }

    setupQuickFilters() {
        const quickFilters = document.querySelectorAll('.quick-filter');
        quickFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                
                // تأثير النقر
                this.animateButton(filter);
                
                const filterType = filter.dataset.filter;
                const filterValue = filter.dataset.value;
                
                switch(filterType) {
                    case 'new':
                        this.applyNewCarsFilter();
                        break;
                    case 'featured':
                        this.applyFeaturedFilter();
                        break;
                    case 'discount':
                        this.applyDiscountFilter();
                        break;
                    case 'guaranteed':
                        this.applyGuaranteedFilter();
                        break;
                }
                
                this.showFilterNotification(`تم تطبيق فلتر: ${filter.textContent}`);
            });
        });
    }

    setupPriceFilter() {
        const priceSlider = document.getElementById('price-slider');
        const minPriceInput = document.getElementById('min-price-input');
        const maxPriceInput = document.getElementById('max-price-input');
        const minPriceDisplay = document.getElementById('min-price-display');
        const maxPriceDisplay = document.getElementById('max-price-display');
        
        if (priceSlider) {
            // تحديث عرض السعر
            const updatePriceDisplay = () => {
                const maxValue = parseInt(priceSlider.max);
                const currentValue = parseInt(priceSlider.value);
                const percentage = (currentValue / maxValue) * 100;
                
                priceSlider.style.background = `linear-gradient(90deg, 
                    #3b82f6 ${percentage}%, 
                    #e5e7eb ${percentage}%)`;
                
                if (maxPriceDisplay) {
                    maxPriceDisplay.textContent = currentValue.toLocaleString() + ' ر.س';
                    maxPriceDisplay.classList.add('highlight');
                    setTimeout(() => maxPriceDisplay.classList.remove('highlight'), 300);
                }
            };
            
            priceSlider.addEventListener('input', updatePriceDisplay);
            updatePriceDisplay();
            
            // تحديث الفلتر عند تغيير السعر
            priceSlider.addEventListener('change', () => {
                this.currentFilters.price.max = parseInt(priceSlider.value);
                this.applyFilters();
            });
        }
        
        // تحديث الفلتر من حقول الإدخال
        if (minPriceInput && maxPriceInput) {
            minPriceInput.addEventListener('change', () => {
                this.currentFilters.price.min = parseInt(minPriceInput.value) || 0;
                this.applyFilters();
            });
            
            maxPriceInput.addEventListener('change', () => {
                this.currentFilters.price.max = parseInt(maxPriceInput.value) || 1000000;
                this.applyFilters();
            });
        }
    }

    setupYearFilter() {
        const yearSelect = document.getElementById('year-select');
        const yearRange = document.getElementById('year-range');
        
        if (yearSelect) {
            yearSelect.addEventListener('change', (e) => {
                this.currentFilters.year = e.target.value ? [e.target.value] : [];
                this.applyFilters();
            });
        }
        
        if (yearRange) {
            // إنشاء فلترة نطاق السنوات
            const setupYearRange = () => {
                const years = this.getAvailableYears();
                yearRange.innerHTML = years.map(year => `
                    <label class="year-checkbox">
                        <input type="checkbox" value="${year}">
                        <span>${year}</span>
                        <span class="count">${this.countCarsByYear(year)}</span>
                    </label>
                `).join('');
                
                // إضافة أحداث للتحديد
                yearRange.querySelectorAll('input').forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        this.updateYearFilters();
                    });
                });
            };
            
            setupYearRange();
        }
    }

    setupBrandFilter() {
        const brandContainer = document.getElementById('brand-filters');
        if (!brandContainer) return;
        
        // الحصول على جميع الماركات المتاحة
        const brands = this.getAvailableBrands();
        
        brandContainer.innerHTML = brands.map(brand => `
            <label class="brand-filter-item">
                <input type="checkbox" value="${brand.id}">
                <div class="brand-logo">
                    <img src="${brand.logo}" alt="${brand.name}" onerror="this.src='https://via.placeholder.com/40'">
                </div>
                <div class="brand-info">
                    <span class="brand-name">${brand.name}</span>
                    <span class="brand-count">${brand.count} سيارة</span>
                </div>
            </label>
        `).join('');
        
        // إضافة أحداث للتحديد
        brandContainer.querySelectorAll('input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateBrandFilters();
            });
        });
    }

    setupOtherFilters() {
        // فلترة نوع الوقود
        document.querySelectorAll('input[name="fuel-type"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFuelFilters();
            });
        });
        
        // فلترة نوع الناقل
        document.querySelectorAll('input[name="transmission"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateTransmissionFilters();
            });
        });
        
        // فلترة حالة السيارة
        document.querySelectorAll('input[name="condition"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateConditionFilters();
            });
        });
        
        // فلترة المسافة المقطوعة
        const mileageSlider = document.getElementById('mileage-slider');
        if (mileageSlider) {
            mileageSlider.addEventListener('change', () => {
                this.currentFilters.mileage.max = parseInt(mileageSlider.value);
                this.applyFilters();
            });
        }
        
        // فلترة الموقع
        const locationSelect = document.getElementById('location-select');
        if (locationSelect) {
            locationSelect.addEventListener('change', (e) => {
                this.currentFilters.location = e.target.value ? [e.target.value] : [];
                this.applyFilters();
            });
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('car-search');
        const searchButton = document.getElementById('search-button');
        
        if (searchInput) {
            // البحث أثناء الكتابة مع تأخير
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchCars(e.target.value);
                }, 500);
            });
            
            // البحث عند الضغط على Enter
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchCars(e.target.value);
                }
            });
        }
        
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                const searchValue = searchInput ? searchInput.value : '';
                this.searchCars(searchValue);
            });
        }
    }

    setupAdvancedFilters() {
        const advancedFiltersBtn = document.getElementById('advanced-filters-btn');
        const advancedFiltersPanel = document.getElementById('advanced-filters');
        
        if (advancedFiltersBtn && advancedFiltersPanel) {
            advancedFiltersBtn.addEventListener('click', () => {
                advancedFiltersPanel.classList.toggle('hidden');
                advancedFiltersBtn.querySelector('i').classList.toggle('fa-chevron-down');
                advancedFiltersBtn.querySelector('i').classList.toggle('fa-chevron-up');
                
                // تأثير انزلاق
                if (!advancedFiltersPanel.classList.contains('hidden')) {
                    advancedFiltersPanel.style.maxHeight = '0';
                    setTimeout(() => {
                        advancedFiltersPanel.style.maxHeight = advancedFiltersPanel.scrollHeight + 'px';
                    }, 10);
                }
            });
        }
        
        // فلترة المميزات
        this.setupFeaturesFilter();
    }

    setupFeaturesFilter() {
        const featuresContainer = document.getElementById('features-filters');
        if (!featuresContainer) return;
        
        const features = [
            { id: 'sunroof', name: 'فتحة سقف', icon: 'fas fa-sun' },
            { id: 'leather', name: 'مقاعد جلد', icon: 'fas fa-chair' },
            { id: 'camera', name: 'كاميرا خلفية', icon: 'fas fa-camera' },
            { id: 'screen', name: 'شاشة لمس', icon: 'fas fa-tv' },
            { id: 'cruise', name: 'مثبت سرعة', icon: 'fas fa-tachometer-alt' },
            { id: 'bluetooth', name: 'بلوتوث', icon: 'fas fa-bluetooth' },
            { id: 'climate', name: 'تكييف ثنائي', icon: 'fas fa-snowflake' },
            { id: 'electric', name: 'مقاعد كهربائية', icon: 'fas fa-plug' }
        ];
        
        featuresContainer.innerHTML = features.map(feature => `
            <label class="feature-filter-item">
                <input type="checkbox" value="${feature.id}">
                <i class="${feature.icon} ml-2"></i>
                <span>${feature.name}</span>
            </label>
        `).join('');
        
        // إضافة أحداث التحديد
        featuresContainer.querySelectorAll('input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFeaturesFilters();
            });
        });
    }

    setupFilterAnimations() {
        // تأثيرات التطبيق
        const applyBtn = document.getElementById('apply-filters-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.animateButton(applyBtn);
                this.applyFilters();
            });
        }
        
        // تأثيرات إعادة التعيين
        const resetBtn = document.getElementById('reset-filters-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.animateButton(resetBtn);
                this.resetFilters();
            });
        }
        
        // تأثيرات حفظ البحث
        const saveSearchBtn = document.getElementById('save-search-btn');
        if (saveSearchBtn) {
            saveSearchBtn.addEventListener('click', () => {
                this.saveSearch();
            });
        }
    }

    // دوال التحديث
    updateYearFilters() {
        const selectedYears = Array.from(
            document.querySelectorAll('#year-range input:checked')
        ).map(cb => cb.value);
        
        this.currentFilters.year = selectedYears;
        this.applyFilters();
    }

    updateBrandFilters() {
        const selectedBrands = Array.from(
            document.querySelectorAll('.brand-filter-item input:checked')
        ).map(cb => cb.value);
        
        this.currentFilters.brand = selectedBrands;
        this.applyFilters();
    }

    updateFuelFilters() {
        const selectedFuels = Array.from(
            document.querySelectorAll('input[name="fuel-type"]:checked')
        ).map(cb => cb.value);
        
        this.currentFilters.fuel = selectedFuels;
        this.applyFilters();
    }

    updateTransmissionFilters() {
        const selectedTransmissions = Array.from(
            document.querySelectorAll('input[name="transmission"]:checked')
        ).map(cb => cb.value);
        
        this.currentFilters.transmission = selectedTransmissions;
        this.applyFilters();
    }

    updateConditionFilters() {
        const selectedConditions = Array.from(
            document.querySelectorAll('input[name="condition"]:checked')
        ).map(cb => cb.value);
        
        this.currentFilters.condition = selectedConditions;
        this.applyFilters();
    }

    updateFeaturesFilters() {
        const selectedFeatures = Array.from(
            document.querySelectorAll('.feature-filter-item input:checked')
        ).map(cb => cb.value);
        
        this.currentFilters.features = selectedFeatures;
        this.applyFilters();
    }

    // تطبيق الفلاتر
    applyFilters() {
        this.filteredCars = this.carsData.filter(car => {
            // فلترة السعر
            if (car.price < this.currentFilters.price.min || 
                car.price > this.currentFilters.price.max) {
                return false;
            }
            
            // فلترة السنة
            if (this.currentFilters.year.length > 0 && 
                !this.currentFilters.year.includes(car.year.toString())) {
                return false;
            }
            
            // فلترة الماركة
            if (this.currentFilters.brand.length > 0) {
                const carBrand = this.getBrandFromTitle(car.title);
                if (!this.currentFilters.brand.includes(carBrand)) {
                    return false;
                }
            }
            
            // فلترة الوقود
            if (this.currentFilters.fuel.length > 0 && 
                !this.currentFilters.fuel.includes(car.fuelType)) {
                return false;
            }
            
            // فلترة الناقل
            if (this.currentFilters.transmission.length > 0 && 
                !this.currentFilters.transmission.includes(car.transmission)) {
                return false;
            }
            
            // فلترة المسافة
            if (car.mileage > this.currentFilters.mileage.max) {
                return false;
            }
            
            // فلترة الموقع
            if (this.currentFilters.location.length > 0 && 
                !this.currentFilters.location.includes(car.location)) {
                return false;
            }
            
            return true;
        });
        
        this.displayFilteredCars();
        this.updateFilterCount();
        this.saveFiltersToLocalStorage();
    }

    // البحث عن السيارات
    searchCars(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredCars = [...this.carsData];
            this.displayFilteredCars();
            return;
        }
        
        const searchTerms = searchTerm.toLowerCase().split(' ');
        
        this.filteredCars = this.carsData.filter(car => {
            const searchText = `
                ${car.title.toLowerCase()}
                ${car.description?.toLowerCase() || ''}
                ${car.brand?.toLowerCase() || ''}
                ${car.model?.toLowerCase() || ''}
                ${car.year}
                ${car.location.toLowerCase()}
            `;
            
            return searchTerms.every(term => 
                searchText.includes(term.toLowerCase())
            );
        });
        
        this.displayFilteredCars();
        this.showSearchNotification(searchTerm);
    }

    // تطبيق فلاتر سريعة
    applyNewCarsFilter() {
        this.currentFilters.year = [new Date().getFullYear().toString()];
        this.applyFilters();
    }

    applyFeaturedFilter() {
        this.filteredCars = this.carsData.filter(car => car.featured);
        this.displayFilteredCars();
    }

    applyDiscountFilter() {
        this.filteredCars = this.carsData.filter(car => car.discount || car.priceReduction);
        this.displayFilteredCars();
    }

    applyGuaranteedFilter() {
        this.filteredCars = this.carsData.filter(car => car.guaranteed || car.warranty);
        this.displayFilteredCars();
    }

    // عرض السيارات المصفاة
    displayFilteredCars() {
        const carsContainer = document.getElementById('cars-container');
        const carsListView = document.getElementById('cars-list-view');
        
        if (!carsContainer && !carsListView) return;
        
        const viewMode = document.querySelector('.active-view')?.dataset.view || 'grid';
        
        if (viewMode === 'grid' && carsContainer) {
            this.displayGridView(carsContainer);
        } else if (viewMode === 'list' && carsListView) {
            this.displayListView(carsListView);
        }
        
        this.updateResultsCount();
    }

    displayGridView(container) {
        if (this.filteredCars.length === 0) {
            container.innerHTML = this.getNoResultsHTML();
            return;
        }
        
        container.innerHTML = this.filteredCars.map(car => 
            this.generateCarCard(car)
        ).join('');
        
        this.addCarCardEffects();
    }

    displayListView(container) {
        if (this.filteredCars.length === 0) {
            container.innerHTML = this.getNoResultsHTML();
            return;
        }
        
        container.innerHTML = this.filteredCars.map(car => 
            this.generateCarListItem(car)
        ).join('');
    }

    generateCarCard(car) {
        const isFavorite = this.isFavorite(car.id);
        
        return `
        <div class="car-card bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
             data-car-id="${car.id}">
            <div class="relative overflow-hidden h-48">
                <img src="${car.image}" alt="${car.title}" 
                     class="w-full h-full object-cover transition-transform duration-500">
                
                ${car.featured ? `
                <div class="absolute top-4 right-4">
                    <span class="badge badge-featured">مميزة</span>
                </div>` : ''}
                
                <button class="favorite-btn absolute top-4 left-4 bg-white/90 w-10 h-10 rounded-full 
                         flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                        data-car-id="${car.id}">
                    <i class="${isFavorite ? 'fas text-red-500' : 'far'} fa-heart"></i>
                </button>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${car.title}</h3>
                
                <div class="flex items-center text-gray-600 mb-4">
                    <i class="fas fa-map-marker-alt text-blue-500 ml-2"></i>
                    <span>${car.location}</span>
                </div>
                
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <div class="flex items-center">
                        <i class="fas fa-tachometer-alt text-blue-500 ml-2"></i>
                        <span class="text-sm">${car.mileage.toLocaleString()} كم</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-calendar text-blue-500 ml-2"></i>
                        <span class="text-sm">${car.year}</span>
                    </div>
                </div>
                
                <div class="flex justify-between items-center pt-4 border-t">
                    <div class="text-2xl font-bold text-blue-600">
                        ${car.price.toLocaleString()} ر.س
                    </div>
                    <a href="car-details.html?id=${car.id}" 
                       class="btn-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition">
                        التفاصيل
                    </a>
                </div>
            </div>
        </div>
        `;
    }

    generateCarListItem(car) {
        return `
        <div class="car-list-item bg-white rounded-lg p-6 mb-4 shadow hover:shadow-lg transition-shadow">
            <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/4">
                    <img src="${car.image}" alt="${car.title}" 
                         class="w-full h-48 object-cover rounded-lg">
                </div>
                <div class="md:w-3/4">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-bold text-gray-800">${car.title}</h3>
                        <div class="text-2xl font-bold text-blue-600">
                            ${car.price.toLocaleString()} ر.س
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap gap-4 mb-4">
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-map-marker-alt ml-2"></i>
                            <span>${car.location}</span>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-tachometer-alt ml-2"></i>
                            <span>${car.mileage.toLocaleString()} كم</span>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-calendar ml-2"></i>
                            <span>${car.year}</span>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-gas-pump ml-2"></i>
                            <span>${car.fuelType}</span>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 mb-4 line-clamp-2">${car.description || ''}</p>
                    
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span>${car.rating || 4.5}</span>
                            <span class="text-gray-500 mr-2">(${car.views || 0} مشاهدة)</span>
                        </div>
                        <a href="car-details.html?id=${car.id}" 
                           class="btn-primary text-white px-6 py-2 rounded-lg font-medium">
                            التفاصيل
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    getNoResultsHTML() {
        return `
        <div class="col-span-3 text-center py-16 animate__animated animate__fadeIn">
            <div class="mb-6">
                <i class="fas fa-search text-6xl text-gray-300"></i>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-700">لم يتم العثور على سيارات</h3>
            <p class="text-gray-500 mb-8 max-w-md mx-auto">
                لا توجد سيارات تطابق معايير البحث الحالية. حاول تعديل الفلاتر.
            </p>
            <button id="reset-filters-btn" 
                    class="btn-primary text-white px-8 py-3 rounded-xl font-medium hover:shadow-xl transition">
                <i class="fas fa-redo mr-2"></i> إعادة تعيين الفلاتر
            </button>
        </div>
        `;
    }

    // دوال مساعدة
    getAvailableYears() {
        const years = [...new Set(this.carsData.map(car => car.year))];
        return years.sort((a, b) => b - a);
    }

    getAvailableBrands() {
        const brandCounts = {};
        this.carsData.forEach(car => {
            const brand = this.getBrandFromTitle(car.title);
            brandCounts[brand] = (brandCounts[brand] || 0) + 1;
        });
        
        return Object.entries(brandCounts).map(([name, count]) => ({
            id: name,
            name: name,
            count: count,
            logo: this.getBrandLogo(name)
        }));
    }

    getBrandFromTitle(title) {
        const brands = ['تويوتا', 'هوندا', 'نيسان', 'بي إم دبليو', 'مرسيدس', 'لكزس', 'هيونداي', 'كيا'];
        for (const brand of brands) {
            if (title.includes(brand)) {
                return brand;
            }
        }
        return 'أخرى';
    }

    getBrandLogo(brandName) {
        const logos = {
            'تويوتا': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Toyota_logo_red.svg/800px-Toyota_logo_red.svg.png',
            'هوندا': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Honda.svg/800px-Honda.svg.png',
            'نيسان': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Nissan_logo.png/800px-Nissan_logo.png',
            'بي إم دبليو': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/800px-BMW.svg.png',
            'مرسيدس': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png',
            'لكزس': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lexus_Logo_2022.svg/800px-Lexus_Logo_2022.svg.png'
        };
        return logos[brandName] || 'https://via.placeholder.com/40';
    }

    countCarsByYear(year) {
        return this.carsData.filter(car => car.year == year).length;
    }

    isFavorite(carId) {
        const favorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
        return favorites.includes(carId);
    }

    // تأثيرات ورسائل
    animateButton(button) {
        button.classList.add('scale-95');
        setTimeout(() => button.classList.remove('scale-95'), 150);
    }

    showFilterNotification(message) {
        this.showNotification(message, 'info');
    }

    showSearchNotification(searchTerm) {
        const count = this.filteredCars.length;
        const message = count > 0 
            ? `تم العثور على ${count} سيارة تطابق "${searchTerm}"`
            : `لم يتم العثور على سيارات تطابق "${searchTerm}"`;
        
        this.showNotification(message, count > 0 ? 'success' : 'warning');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `
            fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg
            ${type === 'success' ? 'bg-green-500' : 
              type === 'warning' ? 'bg-yellow-500' : 
              type === 'error' ? 'bg-red-500' : 'bg-blue-500'}
            text-white transform transition-transform duration-300
            animate__animated animate__fadeInDown
        `;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                  type === 'warning' ? 'exclamation-triangle' : 
                                  type === 'error' ? 'exclamation-circle' : 'info-circle'} 
                    mr-3"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('animate__fadeOutUp');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    updateFilterCount() {
        const filterCountElement = document.getElementById('filter-count');
        if (filterCountElement) {
            const activeFilters = Object.values(this.currentFilters)
                .flat()
                .filter(value => value && (Array.isArray(value) ? value.length > 0 : true))
                .length;
            
            filterCountElement.textContent = activeFilters;
            filterCountElement.classList.toggle('hidden', activeFilters === 0);
        }
    }

    updateResultsCount() {
        const resultsCountElements = document.querySelectorAll('.results-count');
        resultsCountElements.forEach(element => {
            element.textContent = this.filteredCars.length.toLocaleString();
            element.classList.add('highlight');
            setTimeout(() => element.classList.remove('highlight'), 300);
        });
    }

    addCarCardEffects() {
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
            });
        });
    }

    // إدارة حالة الفلاتر
    saveFiltersToLocalStorage() {
        localStorage.setItem('carFilters', JSON.stringify(this.currentFilters));
    }

    loadFiltersFromLocalStorage() {
        const savedFilters = localStorage.getItem('carFilters');
        if (savedFilters) {
            this.currentFilters = JSON.parse(savedFilters);
            this.applyFilters();
        }
    }

    resetFilters() {
        this.currentFilters = {
            price: { min: 0, max: 1000000 },
            year: [],
            brand: [],
            fuel: [],
            transmission: [],
            condition: [],
            mileage: { min: 0, max: 500000 },
            location: []
        };
        
        // إعادة تعيين واجهة المستخدم
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        document.querySelectorAll('select').forEach(select => {
            select.value = '';
        });
        
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) priceSlider.value = priceSlider.max;
        
        this.filteredCars = [...this.carsData];
        this.displayFilteredCars();
        this.updateFilterCount();
        
        this.showNotification('تم إعادة تعيين جميع الفلاتر', 'success');
    }

    saveSearch() {
        const searchName = prompt('أدخل اسم لهذا البحث:');
        if (searchName) {
            const savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];
            savedSearches.push({
                name: searchName,
                filters: this.currentFilters,
                date: new Date().toISOString(),
                results: this.filteredCars.length
            });
            
            localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
            this.showNotification('تم حفظ البحث بنجاح', 'success');
        }
    }
}

// تهيئة مدير الفلاتر عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.filtersManager = new FiltersManager();
});