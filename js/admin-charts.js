// ملف المخططات الإحصائية المتقدمة

class AdminCharts {
    constructor() {
        this.charts = {};
        this.chartColors = {
            primary: '#4f46e5',
            secondary: '#7c3aed',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#3b82f6',
            light: '#94a3b8',
            dark: '#1e293b'
        };
    }

    initDashboardCharts() {
        this.initSalesChart();
        this.initBrandsChart();
        this.initUsersChart();
        this.initRevenueChart();
    }

    initSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        this.charts.sales = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
                datasets: [
                    {
                        label: 'المبيعات',
                        data: [65, 78, 90, 82, 105, 120, 140],
                        borderColor: this.chartColors.primary,
                        backgroundColor: this.hexToRgba(this.chartColors.primary, 0.1),
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: this.chartColors.primary,
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    },
                    {
                        label: 'المشاهدات',
                        data: [45, 60, 75, 65, 85, 95, 110],
                        borderColor: this.chartColors.success,
                        backgroundColor: this.hexToRgba(this.chartColors.success, 0.1),
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: this.chartColors.success,
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Almarai, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        rtl: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Almarai, sans-serif'
                        },
                        bodyFont: {
                            family: 'Almarai, sans-serif'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('ar-SA');
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    initBrandsChart() {
        const ctx = document.getElementById('brandsChart');
        if (!ctx) return;

        this.charts.brands = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['تويوتا', 'هوندا', 'نيسان', 'بي إم دبليو', 'مرسيدس', 'أخرى'],
                datasets: [{
                    data: [35, 20, 15, 12, 10, 8],
                    backgroundColor: [
                        this.chartColors.primary,
                        this.chartColors.secondary,
                        this.chartColors.success,
                        this.chartColors.warning,
                        this.chartColors.danger,
                        this.chartColors.light
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Almarai, sans-serif'
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        rtl: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} سيارة (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }

    initUsersChart() {
        const ctx = document.getElementById('usersChart');
        if (!ctx) return;

        this.charts.users = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                datasets: [
                    {
                        label: 'مستخدمون جدد',
                        data: [42, 38, 45, 52, 48, 55, 60],
                        backgroundColor: this.chartColors.primary,
                        borderColor: this.chartColors.primary,
                        borderWidth: 1
                    },
                    {
                        label: 'بائعون جدد',
                        data: [12, 15, 18, 22, 20, 25, 28],
                        backgroundColor: this.chartColors.success,
                        borderColor: this.chartColors.success,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('ar-SA');
                            }
                        }
                    }
                }
            }
        });
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'الإيرادات (مليون ريال)',
                    data: [1.2, 1.8, 2.4, 3.1],
                    borderColor: this.chartColors.warning,
                    backgroundColor: this.hexToRgba(this.chartColors.warning, 0.1),
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    initRealTimeChart(containerId, data) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return;

        this.charts[containerId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: data.label,
                    data: data.values,
                    borderColor: data.color || this.chartColors.primary,
                    backgroundColor: this.hexToRgba(data.color || this.chartColors.primary, 0.1),
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });
    }

    updateRealTimeChart(chartId, newData) {
        const chart = this.charts[chartId];
        if (!chart) return;

        chart.data.labels.push(newData.label);
        chart.data.datasets[0].data.push(newData.value);

        // حفظ آخر 20 نقطة فقط
        if (chart.data.labels.length > 20) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.update('none');
    }

    initComparisonChart(containerId, data) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return;

        this.charts[containerId] = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: data.datasets.map((dataset, index) => ({
                    label: dataset.label,
                    data: dataset.values,
                    backgroundColor: this.hexToRgba(this.getColorByIndex(index), 0.2),
                    borderColor: this.getColorByIndex(index),
                    borderWidth: 2,
                    pointBackgroundColor: this.getColorByIndex(index)
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initMapChart(containerId, data) {
        // مخطط جغرافي للمناطق
        const ctx = document.getElementById(containerId);
        if (!ctx) return;

        this.charts[containerId] = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'المناطق',
                    data: data.map(item => ({
                        x: item.x,
                        y: item.y,
                        r: item.value / 10
                    })),
                    backgroundColor: data.map(item => this.getColorByValue(item.value)),
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const item = data[context.dataIndex];
                                return `${item.label}: ${item.value} سيارة`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
    }

    initHourlyChart(containerId, data) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return;

        this.charts[containerId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                datasets: [{
                    label: 'الزيارات',
                    data: data,
                    backgroundColor: Array.from({length: 24}, (_, i) => {
                        if (i >= 9 && i <= 17) {
                            return this.chartColors.primary;
                        } else if (i >= 18 && i <= 22) {
                            return this.chartColors.warning;
                        } else {
                            return this.chartColors.light;
                        }
                    }),
                    borderColor: '#ffffff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initAgeDistributionChart(containerId, data) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return;

        this.charts[containerId] = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
                datasets: [{
                    data: data,
                    backgroundColor: [
                        this.chartColors.primary,
                        this.chartColors.secondary,
                        this.chartColors.success,
                        this.chartColors.warning,
                        this.chartColors.danger
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    initConversionChart(containerId, data) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return;

        this.charts[containerId] = new Chart(ctx, {
            type: 'funnel',
            data: {
                labels: data.steps,
                datasets: [{
                    data: data.values,
                    backgroundColor: data.values.map((_, i) => 
                        this.hexToRgba(this.chartColors.primary, 1 - (i * 0.2))
                    ),
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const percentage = ((value / data.values[0]) * 100).toFixed(1);
                                return `${value} مستخدم (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    initHeatmapChart(containerId, data) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return;

        this.charts[containerId] = new Chart(ctx, {
            type: 'matrix',
            data: {
                datasets: [{
                    label: 'نشاط المستخدمين',
                    data: data,
                    backgroundColor: (context) => {
                        const value = context.dataset.data[context.dataIndex].v;
                        const alpha = Math.min(value / 100, 1);
                        return this.hexToRgba(this.chartColors.primary, alpha);
                    },
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    width: ({chart}) => (chart.chartArea || {}).width / 7 - 1,
                    height: ({chart}) => (chart.chartArea || {}).height / 24 - 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function() {
                                return '';
                            },
                            label: function(context) {
                                const {x, y, v} = context.dataset.data[context.dataIndex];
                                return `الساعة ${y}:00 - ${v} مستخدم`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        offset: true,
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'EEE'
                            }
                        },
                        ticks: {
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        offset: true,
                        reverse: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}:00`;
                            },
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // دوال مساعدة
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    getColorByIndex(index) {
        const colors = Object.values(this.chartColors);
        return colors[index % colors.length];
    }

    getColorByValue(value) {
        if (value > 80) return this.chartColors.success;
        if (value > 60) return this.chartColors.warning;
        if (value > 40) return this.chartColors.primary;
        if (value > 20) return this.chartColors.secondary;
        return this.chartColors.light;
    }

    destroyChart(chartId) {
        if (this.charts[chartId]) {
            this.charts[chartId].destroy();
            delete this.charts[chartId];
        }
    }

    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartId => {
            this.destroyChart(chartId);
        });
    }

    updateChartData(chartId, newData) {
        const chart = this.charts[chartId];
        if (!chart) return;

        chart.data = newData;
        chart.update();
    }

    exportChart(chartId, filename = 'chart') {
        const chart = this.charts[chartId];
        if (!chart) return;

        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = chart.toBase64Image();
        link.click();
    }

    printChart(chartId) {
        const chart = this.charts[chartId];
        if (!chart) return;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl">
                <head>
                    <title>طباعة المخطط</title>
                    <style>
                        body { margin: 0; padding: 20px; }
                        img { max-width: 100%; height: auto; }
                    </style>
                </head>
                <body>
                    <img src="${chart.toBase64Image()}" />
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
}

// تهيئة المخططات
document.addEventListener('DOMContentLoaded', () => {
    window.adminCharts = new AdminCharts();
    
    // تهيئة مخططات لوحة التحكم
    if (document.querySelector('.chart-container')) {
        adminCharts.initDashboardCharts();
    }
});