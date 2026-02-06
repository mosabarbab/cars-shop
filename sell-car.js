// ملف JavaScript لصفحة بيع السيارة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة Dropzone
    Dropzone.autoDiscover = false;
    
    const myDropzone = new Dropzone("#image-dropzone", {
        url: "/upload", // يجب تغيير هذا في البيئة الحقيقية
        paramName: "images",
        maxFiles: 15,
        maxFilesize: 5, // MB
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictDefaultMessage: "اسحب وأفلت الصور هنا",
        dictFallbackMessage: "المتصفح الخاص بك لا يدعم رفع الملفات",
        dictFileTooBig: "الملف كبير جداً ({{filesize}}MB). الحد الأقصى: {{maxFilesize}}MB.",
        dictInvalidFileType: "لا يمكنك رفع ملفات من هذا النوع.",
        dictResponseError: "حدث خطأ في السيرفر.",
        dictCancelUpload: "إلغاء الرفع",
        dictCancelUploadConfirmation: "هل أنت متأكد من إلغاء الرفع؟",
        dictRemoveFile: "حذف الصورة",
        dictMaxFilesExceeded: "لا يمكنك رفع أكثر من {{maxFiles}} صور.",
        autoProcessQueue: false,
        thumbnailWidth: 120,
        thumbnailHeight: 90,
        init: function() {
            this.on("success", function(file, response) {
                console.log("تم رفع الصورة بنجاح:", file.name);
            });
            
            this.on("error", function(file, errorMessage) {
                console.error("خطأ في رفع الصورة:", errorMessage);
            });
            
            this.on("removedfile", function(file) {
                console.log("تم حذف الصورة:", file.name);
            });
        }
    });
    
    // إدارة الخطوات
    let currentStep = 1;
    const totalSteps = 4;
    
    // أزرار التالي
    const nextButtons = document.querySelectorAll('.next-step');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateCurrentStep()) {
                goToStep(currentStep + 1);
            }
        });
    });
    
    // أزرار السابق
    const prevButtons = document.querySelectorAll('.prev-step');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            goToStep(currentStep - 1);
        });
    });
    
    // الانتقال بين الخطوات
    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;
        
        // إخفاء الخطوة الحالية
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
            currentStepElement.classList.add('hidden');
        }
        
        // تحديث مؤشر الخطوات
        updateStepIndicators(currentStep, false);
        
        // الانتقال للخطوة الجديدة
        currentStep = step;
        
        // إظهار الخطوة الجديدة
        const newStepElement = document.getElementById(`step-${currentStep}`);
        if (newStepElement) {
            newStepElement.classList.remove('hidden');
            newStepElement.classList.add('active');
        }
        
        // تحديث مؤشر الخطوات
        updateStepIndicators(currentStep, true);
        
        // إذا كانت الخطوة الأخيرة، تحديث المعاينة
        if (currentStep === totalSteps) {
            updatePreview();
        }
    }
    
    // تحديث مؤشرات الخطوات
    function updateStepIndicators(step, isActive) {
        const indicators = document.querySelectorAll('.step-indicator');
        const stepCircle = indicators[step - 1]?.querySelector('div');
        
        if (stepCircle) {
            if (isActive) {
                stepCircle.classList.remove('bg-gray-200', 'text-gray-600');
                stepCircle.classList.add('bg-green-500', 'text-white');
                
                const stepText = indicators[step - 1]?.querySelector('span');
                if (stepText) {
                    stepText.classList.remove('text-gray-500');
                    stepText.classList.add('text-green-600');
                }
            } else {
                if (step < currentStep) {
                    stepCircle.classList.remove('bg-gray-200', 'text-gray-600');
                    stepCircle.classList.add('bg-green-500', 'text-white');
                }
            }
        }
    }
    
    // التحقق من صحة الخطوة الحالية
    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        const requiredInputs = currentStepElement?.querySelectorAll('[required]');
        
        if (!requiredInputs) return true;
        
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500');
                
                // إضافة حدث لإزالة التأكيد على الخطأ
                input.addEventListener('input', function() {
                    this.classList.remove('border-red-500');
                }, { once: true });
            } else {
                input.classList.remove('border-red-500');
            }
        });
        
        // تحقق خاص للخطوة 3 (الصور)
        if (currentStep === 3) {
            const uploadedFiles = myDropzone.files.length;
            if (uploadedFiles < 3) {
                isValid = false;
                showNotification('يرجى رفع 3 صور على الأقل للسيارة', 'error');
            }
        }
        
        if (!isValid) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        }
        
        return isValid;
    }
    
    // تحديث المعاينة في الخطوة الأخيرة
    function updatePreview() {
        // جمع البيانات من النموذج
        const formData = {
            brand: document.querySelector('#step-1 select:nth-child(1)')?.value || '',
            model: document.querySelector('#step-1 input[type="text"]')?.value || '',
            year: document.querySelector('#step-1 select:nth-child(3)')?.value || '',
            mileage: document.querySelector('#step-1 input[type="number"]')?.value || '',
            condition: document.querySelector('#step-1 select:nth-child(5)')?.value || '',
            price: document.querySelector('#step-1 input[type="number"]:last-child')?.value || '',
            fuelType: document.querySelector('#step-2 select:nth-child(1)')?.value || '',
            transmission: document.querySelector('#step-2 select:nth-child(2)')?.value || '',
            color: document.querySelector('#step-2 select:nth-child(4)')?.value || '',
            description: document.querySelector('#step-2 textarea')?.value || ''
        };
        
        // تحديث المعاينة
        const previewCard = document.querySelector('.preview-card');
        if (previewCard) {
            // يمكن هنا تحديث محتوى المعاينة بناءً على البيانات المجمعة
            console.log('بيانات المعاينة:', formData);
        }
    }
    
    // معالجة إرسال النموذج
    const sellForm = document.getElementById('sell-car-form');
    if (sellForm) {
        sellForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع جميع البيانات
            const formData = collectFormData();
            
            // حفظ في localStorage (مؤقت)
            saveCarListing(formData);
            
            // عرض رسالة النجاح
            showSuccessMessage(formData);
        });
    }
    
    // جمع بيانات النموذج
    function collectFormData() {
        const features = [];
        document.querySelectorAll('#step-2 input[type="checkbox"]:checked').forEach(cb => {
            features.push(cb.nextElementSibling.textContent);
        });
        
        return {
            id: Date.now(),
            title: `${getBrandName(document.querySelector('#step-1 select:nth-child(1)')?.value)} ${document.querySelector('#step-1 input[type="text"]')?.value}`,
            price: parseInt(document.querySelector('#step-1 input[type="number"]:last-child')?.value || 0),
            year: parseInt(document.querySelector('#step-1 select:nth-child(3)')?.value || 0),
            mileage: parseInt(document.querySelector('#step-1 input[type="number"]')?.value || 0),
            fuelType: document.querySelector('#step-2 select:nth-child(1)')?.value || '',
            transmission: document.querySelector('#step-2 select:nth-child(2)')?.value || '',
            color: document.querySelector('#step-2 select:nth-child(4)')?.value || '',
            location: document.querySelector('#step-4 select')?.value || '',
            description: document.querySelector('#step-2 textarea')?.value || '',
            features: features,
            images: Array.from(myDropzone.files).map(file => file.dataURL),
            contact: {
                name: document.querySelector('#step-4 input[type="text"]')?.value || '',
                phone: document.querySelector('#step-4 input[type="tel"]')?.value || '',
                email: document.querySelector('#step-4 input[type="email"]')?.value || ''
            },
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
    }
    
    // حفظ الإعلان
    function saveCarListing(carData) {
        // الحصول على الإعلانات الحالية
        const listings = JSON.parse(localStorage.getItem('carListings')) || [];
        
        // إضافة الإعلان الجديد
        listings.push(carData);
        
        // الحفظ
        localStorage.setItem('carListings', JSON.stringify(listings));
        
        // إضافة إلى carsData للعرض (مؤقت)
        carsData.push({
            id: carData.id,
            title: carData.title,
            price: carData.price,
            year: carData.year,
            mileage: carData.mileage,
            fuelType: carData.fuelType,
            transmission: carData.transmission,
            location: carData.location,
            image: carData.images[0] || 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            featured: false,
            rating: 4.0,
            views: 0,
            seller: {
                name: carData.contact.name,
                verified: false,
                rating: 4.0
            }
        });
    }
    
    // عرض رسالة النجاح
    function showSuccessMessage(carData) {
        const form = document.getElementById('sell-car-form');
        
        form.innerHTML = `
            <div class="text-center py-12 animate__animated animate__fadeIn">
                <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-4xl text-white"></i>
                </div>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">تم نشر إعلانك بنجاح! 🎉</h2>
                <p class="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                    تم نشر إعلان "<span class="font-bold text-green-600">${carData.title}</span>" بنجاح. 
                    يمكنك متابعة طلبات الشراء من خلال لوحة التحكم.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
                    <div class="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h4 class="font-bold text-green-800 mb-2">رقم الإعلان</h4>
                        <div class="text-2xl font-bold text-green-600">#${carData.id.toString().slice(-6)}</div>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h4 class="font-bold text-blue-800 mb-2">السعر</h4>
                        <div class="text-2xl font-bold text-blue-600">${carData.price.toLocaleString()} ر.س</div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <a href="dashboard.html" class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition">
                        <i class="fas fa-chart-line ml-2"></i> الذهاب إلى لوحة التحكم
                    </a>
                    <a href="cars.html" class="inline-block border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition block md:inline-block mt-4">
                        تصفح المزيد من السيارات
                    </a>
                </div>
            </div>
        `;
        
        // إرسال إشعار
        showNotification('تم نشر إعلانك بنجاح! يمكنك متابعته من لوحة التحكم', 'success');
    }
    
    // دوال مساعدة
    function getBrandName(brandCode) {
        const brands = {
            'toyota': 'تويوتا',
            'honda': 'هوندا',
            'nissan': 'نيسان',
            'bmw': 'بي إم دبليو',
            'mercedes': 'مرسيدس',
            'hyundai': 'هيونداي',
            'kia': 'كيا',
            'lexus': 'لكزس',
            'audi': 'أودي',
            'ford': 'فورد'
        };
        
        return brands[brandCode] || brandCode;
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'error' ? 'bg-red-500' : 
            type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        } text-white animate__animated animate__fadeInDown`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('animate__fadeOutUp');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // تهيئة الخطوة الأولى
    updateStepIndicators(1, true);
});