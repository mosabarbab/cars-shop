// بيانات سيارات حقيقية مع تفاصيل كاملة
const carsData = [
    {
        id: 1,
        title: "تويوتا كامري 2023",
        price: 125000,
        year: 2023,
        mileage: 15000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "2.5 لتر - 4 سلندر",
        color: "أبيض لؤلؤي",
        location: "الرياض",
        sellerType: "فرد",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60",
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60"
        ],
        features: ["شاشة لمس 8 بوصة", "كاميرا خلفية", "مثبت سرعة", "تكييف أوتوماتيك", "نظام صوت JBL", "مقاعد جلد", "تحكم كروز"],
        description: "تويوتا كامري 2023 بحالة وكالة تماماً، السيارة تحت الضمان، صيانة دورية في الوكالة، لا يوجد أي حوادث أو صدمات. السيارة مجهزة بكافة وسائل الراحة والأمان. اللون أبيض لؤلؤي، مقاعد جلدية سوداء. متوفرة للفحص في أي وقت.",
        featured: true,
        category: "sedan",
        rating: 4.8,
        views: 3250,
        seller: {
            name: "أحمد العتيبي",
            verified: true,
            rating: 4.9,
            joinDate: "2021-05-15",
            totalCars: 3
        },
        specifications: {
            fuelConsumption: "12 لتر/100 كم",
            doors: 4,
            seats: 5,
            warranty: "ضمان الوكالة حتى 2026",
            inspection: "فحص كامل متوفر"
        },
        tags: ["جديد", "وكالة", "ضمان", "تويوتا"],
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20"
    },
    {
        id: 2,
        title: "بي إم دبليو X5 2022",
        price: 385000,
        year: 2022,
        mileage: 28000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "3.0 لتر - 6 سلندر",
        color: "أسود معدني",
        location: "جدة",
        sellerType: "تاجر",
        image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60"
        ],
        features: ["شاشة 12.3 بوصة", "فتحة سقف بانورامية", "مقاعد كهربائية مع ذكرى", "نظام صوت هارمان كاردون", "دفع رباعي", "نظام ملاحة", "مقاعد تدفئة وتبريد"],
        description: "بي إم دبليو X5 2022 فاخرة، كامل المواصفات، السيارة نظيفة جداً ولا تحتاج لأي مصاريف. المالك الأول، جميع الصيانات في الوكالة، إطارات جديدة، لا يوجد أي أعطال. السيارة فائقة الجودة وتستحق العرض.",
        featured: true,
        category: "suv",
        rating: 4.9,
        views: 5210,
        seller: {
            name: "شركة النخبة للسيارات",
            verified: true,
            rating: 4.8,
            joinDate: "2020-03-10",
            totalCars: 42
        },
        specifications: {
            fuelConsumption: "14 لتر/100 كم",
            doors: 4,
            seats: 5,
            warranty: "ضمان 6 أشهر",
            inspection: "فحص فني شامل"
        },
        tags: ["فاخرة", "كامل المواصفات", "بي إم دبليو", "دفع رباعي"],
        createdAt: "2024-01-10",
        updatedAt: "2024-01-18"
    },
    {
        id: 3,
        title: "مرسيدس C300 2023",
        price: 295000,
        year: 2023,
        mileage: 12000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "2.0 لتر - 4 سلندر",
        color: "فضي معدني",
        location: "الدمام",
        sellerType: "فرد",
        image: "https://images.unsplash.com/photo-1563720223486-7a4d4cce2e2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1563720223486-7a4d4cce2e2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة MBUX", "أنوار LED", "نظام صوت برمايستر", "مقاعد كهربائية", "مثبت سرعة", "أنظمة أمان متقدمة", "تحكم بالنوافذ"],
        description: "مرسيدس C300 2023 جديدة تقريباً، أميتر 12000 كم فقط، السيارة تحت الضمان، صيانة أولى مجانية متبقية. اللون فضي معدني فاتح، المقاعد جلدية بنية. المالك الأول والمحافظة عليها ممتازة.",
        featured: true,
        category: "sedan",
        rating: 4.7,
        views: 3870,
        seller: {
            name: "محمد السبيعي",
            verified: true,
            rating: 4.6,
            joinDate: "2022-08-22",
            totalCars: 1
        },
        specifications: {
            fuelConsumption: "11 لتر/100 كم",
            doors: 4,
            seats: 5,
            warranty: "ضمان الوكالة حتى 2025",
            inspection: "فحص متوفر"
        },
        tags: ["جديد", "مرسيدس", "ضمان", "وكالة"],
        createdAt: "2024-01-05",
        updatedAt: "2024-01-15"
    },
    {
        id: 4,
        title: "لكزس LX570 2021",
        price: 485000,
        year: 2021,
        mileage: 45000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "5.7 لتر - 8 سلندر",
        color: "أسود لؤلؤي",
        location: "الرياض",
        sellerType: "تاجر",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة 12.3 بوصة", "نظام صوت مارك ليفنسون", "مقاعد جلدية شامواه", "فتحة سقف", "مقاعد تدفئة وتبريد", "نظام ملاحة", "كاميرا 360 درجة"],
        description: "لكزس LX570 2021 فاخرة جداً، دفع رباعي، 7 مقاعد، مكيف خلفي، فتحة سقف، نظام صوت مارك ليفنسون. السيارة نظيفة جداً ومحافظة عليها بشكل ممتاز. متوفرة للفحص في المعرض.",
        featured: true,
        category: "suv",
        rating: 4.9,
        views: 6120,
        seller: {
            name: "معرض الفخامة للسيارات",
            verified: true,
            rating: 4.9,
            joinDate: "2019-11-05",
            totalCars: 78
        },
        specifications: {
            fuelConsumption: "18 لتر/100 كم",
            doors: 4,
            seats: 7,
            warranty: "ضمان 12 شهر",
            inspection: "فحص كامل متوفر"
        },
        tags: ["فاخرة", "لكزس", "دفع رباعي", "7 مقاعد"],
        createdAt: "2023-12-20",
        updatedAt: "2024-01-10"
    },
    {
        id: 5,
        title: "تيسلا موديل 3 2023",
        price: 265000,
        year: 2023,
        mileage: 8000,
        fuelType: "كهرباء",
        transmission: "أوتوماتيك",
        engine: "محرك كهربائي",
        color: "أحرد قرمزي",
        location: "جدة",
        sellerType: "فرد",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة 15 بوصة", "قيادة ذاتية", "تحديثات عن بعد", "شحن سريع", "مدى 500 كم", "مقاعد كهربائية", "نظام صوت ممتاز"],
        description: "تيسلا موديل 3 2023 كهربائية بالكامل، شاشة 15 بوصة، نظام قيادة ذاتية، تحديثات عن بعد، شحن سريع. السيارة جديدة تقريباً، موديل 2023، أميتر 8000 كم فقط. نظيفة جداً ولا تحتاج لأي مصاريف.",
        featured: true,
        category: "sedan",
        rating: 4.8,
        views: 4320,
        seller: {
            name: "خالد الراجحي",
            verified: true,
            rating: 4.7,
            joinDate: "2023-02-14",
            totalCars: 2
        },
        specifications: {
            battery: "75 كيلوواط ساعة",
            range: "500 كم",
            charging: "شحن سريع",
            warranty: "ضمان البطارية 8 سنوات",
            inspection: "فحص كهربائي متوفر"
        },
        tags: ["كهربائية", "تيسلا", "جديد", "تقنية"],
        createdAt: "2023-12-15",
        updatedAt: "2024-01-08"
    },
    {
        id: 6,
        title: "هوندا سيفيك 2022",
        price: 85000,
        year: 2022,
        mileage: 35000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "1.5 لتر - 4 سلندر",
        color: "رمادي معدني",
        location: "الرياض",
        sellerType: "فرد",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة لمس", "كاميرا خلفية", "مثبت سرعة", "تكييف أوتوماتيك", "مقاعد قماش", "نظام صوت 6 سماعات"],
        description: "هوندا سيفيك 2022 اقتصادية وموثوقة، صيانة دورية في الوكالة، إطارات جديدة، لا يوجد أي مشاكل. السيارة نظيفة جداً ومن الداخل والخارج، مناسبة للاستخدام اليومي.",
        featured: false,
        category: "sedan",
        rating: 4.5,
        views: 1980,
        seller: {
            name: "سعد الفهد",
            verified: false,
            rating: 4.3,
            joinDate: "2023-06-30",
            totalCars: 1
        },
        specifications: {
            fuelConsumption: "10 لتر/100 كم",
            doors: 4,
            seats: 5,
            warranty: "لا يوجد",
            inspection: "فحص متوفر"
        },
        tags: ["اقتصادية", "هوندا", "موثوقة"],
        createdAt: "2024-01-02",
        updatedAt: "2024-01-12"
    },
    {
        id: 7,
        title: "نيسان باترول 2022",
        price: 285000,
        year: 2022,
        mileage: 32000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "4.0 لتر - 6 سلندر",
        color: "أبيض لؤلؤي",
        location: "الدمام",
        sellerType: "تاجر",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة 8 بوصة", "فتحة سقف", "مقاعد جلدية", "نظام صوت بوز", "دفع رباعي", "مكيف خلفي", "مقاعد تدفئة"],
        description: "نيسان باترول 2022 دفع رباعي، 7 مقاعد، مكيف خلفي، فتحة سقف. السيارة نظيفة جداً ولا تحتاج لأي مصاريف، صيانة دورية في الوكالة، إطارات جديدة 90%.",
        featured: true,
        category: "suv",
        rating: 4.6,
        views: 3420,
        seller: {
            name: "معرض الخليج للسيارات",
            verified: true,
            rating: 4.5,
            joinDate: "2020-09-18",
            totalCars: 35
        },
        specifications: {
            fuelConsumption: "16 لتر/100 كم",
            doors: 4,
            seats: 7,
            warranty: "ضمان 6 أشهر",
            inspection: "فحص كامل متوفر"
        },
        tags: ["دفع رباعي", "نيسان", "7 مقاعد"],
        createdAt: "2023-11-25",
        updatedAt: "2024-01-05"
    },
    {
        id: 8,
        title: "فورد إكسبلورر 2023",
        price: 195000,
        year: 2023,
        mileage: 18000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "2.3 لتر - 4 سلندر",
        color: "أسود معدني",
        location: "جدة",
        sellerType: "فرد",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة 10.1 بوصة", "كاميرا 360 درجة", "مقاعد كهربائية", "نظام صوت باناسونيك", "دفع رباعي", "فتحة سقف", "مقاعد تدفئة وتبريد"],
        description: "فورد إكسبلورر 2023 SUV فاخرة، دفع رباعي، 7 مقاعد، شاشة 10.1 بوصة، كاميرا 360 درجة. السيارة جديدة تقريباً، أميتر 18000 كم فقط، صيانة في الوكالة.",
        featured: true,
        category: "suv",
        rating: 4.7,
        views: 2780,
        seller: {
            name: "عبدالله الشمري",
            verified: true,
            rating: 4.6,
            joinDate: "2022-04-12",
            totalCars: 2
        },
        specifications: {
            fuelConsumption: "13 لتر/100 كم",
            doors: 4,
            seats: 7,
            warranty: "ضمان الوكالة حتى 2025",
            inspection: "فحص متوفر"
        },
        tags: ["فورد", "دفع رباعي", "7 مقاعد", "جديد"],
        createdAt: "2024-01-01",
        updatedAt: "2024-01-14"
    },
    {
        id: 9,
        title: "كيا سورينتو 2021",
        price: 115000,
        year: 2021,
        mileage: 55000,
        fuelType: "ديزل",
        transmission: "أوتوماتيك",
        engine: "2.2 لتر - 4 سلندر",
        color: "أزرق معدني",
        location: "الرياض",
        sellerType: "فرد",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة 8 بوصة", "كاميرا خلفية", "مقاعد جلدية", "نظام صوت 8 سماعات", "مثبت سرعة", "تكييف خلفي", "فتحة سقف"],
        description: "كيا سورينتو 2021 ديزل اقتصادي في استهلاك الوقود، 7 مقاعد، مكيف خلفي. السيارة نظيفة جداً، صيانة دورية، لا يوجد أي أعطال، مناسبة للعائلة.",
        featured: false,
        category: "suv",
        rating: 4.4,
        views: 1620,
        seller: {
            name: "ماجد القحطاني",
            verified: false,
            rating: 4.2,
            joinDate: "2023-08-15",
            totalCars: 1
        },
        specifications: {
            fuelConsumption: "9 لتر/100 كم",
            doors: 4,
            seats: 7,
            warranty: "لا يوجد",
            inspection: "فحص متوفر"
        },
        tags: ["كيا", "ديزل", "اقتصادية", "7 مقاعد"],
        createdAt: "2023-12-28",
        updatedAt: "2024-01-07"
    },
    {
        id: 10,
        title: "بورش كايين 2020",
        price: 365000,
        year: 2020,
        mileage: 42000,
        fuelType: "بنزين",
        transmission: "أوتوماتيك",
        engine: "3.0 لتر - 6 سلندر",
        color: "أبيض",
        location: "الدمام",
        sellerType: "تاجر",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["شاشة 12.3 بوصة", "فتحة سقف بانورامية", "مقاعد كربون رياضية", "نظام صوت بورمايستر", "دفع رباعي", "نظام ملاحة", "مقاعد تدفئة وتبريد"],
        description: "بورش كايين 2020 رياضية فاخرة، دفع رباعي، أداء عالي، كامل المواصفات. السيارة نظيفة جداً ومحافظة عليها بشكل ممتاز، صيانة في الوكالة، لا يوجد أي حوادث.",
        featured: true,
        category: "suv",
        rating: 4.9,
        views: 4980,
        seller: {
            name: "معرض الفخامة للسيارات الرياضية",
            verified: true,
            rating: 4.8,
            joinDate: "2019-07-22",
            totalCars: 24
        },
        specifications: {
            fuelConsumption: "15 لتر/100 كم",
            doors: 4,
            seats: 5,
            warranty: "ضمان 12 شهر",
            inspection: "فحص كامل متوفر"
        },
        tags: ["رياضية", "بورش", "فاخرة", "دفع رباعي"],
        createdAt: "2023-11-30",
        updatedAt: "2024-01-03"
    }
];

// تصنيف السيارات حسب الفئة
const carCategories = {
    sedan: carsData.filter(car => car.category === 'sedan'),
    suv: carsData.filter(car => car.category === 'suv'),
    sports: carsData.filter(car => car.category === 'sports'),
    family: carsData.filter(car => car.category === 'family')
};

// ماركات السيارات
const carBrands = [
    { name: "تويوتا", count: carsData.filter(car => car.title.includes('تويوتا')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Toyota_logo_red.svg/800px-Toyota_logo_red.svg.png" },
    { name: "هوندا", count: carsData.filter(car => car.title.includes('هوندا')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Honda.svg/800px-Honda.svg.png" },
    { name: "نيسان", count: carsData.filter(car => car.title.includes('نيسان')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Nissan_logo.png/800px-Nissan_logo.png" },
    { name: "بي إم دبليو", count: carsData.filter(car => car.title.includes('بي إم دبليو')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/800px-BMW.svg.png" },
    { name: "مرسيدس", count: carsData.filter(car => car.title.includes('مرسيدس')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png" },
    { name: "لكزس", count: carsData.filter(car => car.title.includes('لكزس')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lexus_Logo_2022.svg/800px-Lexus_Logo_2022.svg.png" },
    { name: "تيسلا", count: carsData.filter(car => car.title.includes('تيسلا')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/800px-Tesla_Motors.svg.png" },
    { name: "فورد", count: carsData.filter(car => car.title.includes('فورد')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/800px-Ford_Motor_Company_Logo.svg.png" },
    { name: "كيا", count: carsData.filter(car => car.title.includes('كيا')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Kia_logo.svg/800px-Kia_logo.svg.png" },
    { name: "بورش", count: carsData.filter(car => car.title.includes('بورش')).length, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Porsche_logo.svg/800px-Porsche_logo.svg.png" }
];

// دوال المساعدة
function formatPrice(price) {
    return price.toLocaleString('ar-SA') + ' ر.س';
}

function formatMileage(mileage) {
    return mileage.toLocaleString('ar-SA') + ' كم';
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'أمس';
    if (diffDays < 7) return `قبل ${diffDays} أيام`;
    if (diffDays < 30) return `قبل ${Math.floor(diffDays / 7)} أسابيع`;
    if (diffDays < 365) return `قبل ${Math.floor(diffDays / 30)} أشهر`;
    return `قبل ${Math.floor(diffDays / 365)} سنوات`;
}

// دالة لعرض السيارات المميزة في Swiper
function initializeFeaturedCarsSwiper() {
    const swiperWrapper = document.querySelector('.featured-cars-swiper .swiper-wrapper');
    if (!swiperWrapper) return;
    
    // عرض فقط السيارات المميزة
    const featuredCars = carsData.filter(car => car.featured);
    
    // إضافة كل سيارة كـ slide
    featuredCars.forEach(car => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="bg-white rounded-2xl overflow-hidden shadow-xl card-hover h-full mx-2">
                <div class="relative overflow-hidden h-56">
                    <img src="${car.image}" alt="${car.title}" 
                         class="w-full h-full object-cover transition duration-700 hover:scale-110"
                         loading="lazy">
                    
                    <!-- شارات -->
                    <div class="absolute top-4 right-4 flex flex-col space-y-2">
                        ${car.tags.slice(0, 2).map(tag => `
                            <span class="${tag === 'جديد' || tag === 'وكالة' ? 'badge badge-premium' : 'badge badge-featured'}">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                    
                    <!-- زر المفضلة -->
                    <button class="favorite-btn absolute top-4 left-4 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                            data-car-id="${car.id}">
                        <i class="far fa-heart text-gray-400 hover:text-red-500"></i>
                    </button>
                    
                    <!-- الوقت المنقضي -->
                    <div class="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        ${getTimeAgo(car.createdAt)}
                    </div>
                </div>
                
                <div class="p-6">
                    <!-- العنوان والموقع -->
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-bold text-gray-800 hover:text-blue-600 transition cursor-pointer">${car.title}</h3>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span class="font-bold">${car.rating}</span>
                        </div>
                    </div>
                    
                    <!-- الموقع والبائع -->
                    <div class="flex items-center text-gray-600 mb-4">
                        <i class="fas fa-map-marker-alt text-blue-500 ml-2"></i>
                        <span class="mr-2">${car.location}</span>
                        <span class="mx-2">•</span>
                        <span class="text-sm ${car.sellerType === 'تاجر' ? 'text-green-600' : 'text-blue-600'}">
                            ${car.sellerType}
                        </span>
                    </div>
                    
                    <!-- المواصفات السريعة -->
                    <div class="grid grid-cols-2 gap-3 mb-6">
                        <div class="flex items-center bg-gray-50 p-3 rounded-lg">
                            <i class="fas fa-tachometer-alt text-blue-500 ml-2"></i>
                            <div class="mr-2">
                                <div class="text-sm text-gray-500">المسافة</div>
                                <div class="font-bold">${formatMileage(car.mileage)}</div>
                            </div>
                        </div>
                        <div class="flex items-center bg-gray-50 p-3 rounded-lg">
                            <i class="fas fa-gas-pump text-blue-500 ml-2"></i>
                            <div class="mr-2">
                                <div class="text-sm text-gray-500">الوقود</div>
                                <div class="font-bold">${car.fuelType}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- السعر والزر -->
                    <div class="flex justify-between items-center pt-4 border-t">
                        <div>
                            <div class="price-tag">${formatPrice(car.price)}</div>
                            <div class="text-gray-500 text-sm mt-2">${formatMileage(car.views)} مشاهدة</div>
                        </div>
                        <a href="car-details.html?id=${car.id}" 
                           class="btn-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-300 flex items-center">
                            <i class="fas fa-eye ml-2"></i>عرض التفاصيل
                        </a>
                    </div>
                </div>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });
    
    // تهيئة Swiper
    const swiper = new Swiper('.featured-cars-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 4,
            },
        },
    });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeFeaturedCarsSwiper);