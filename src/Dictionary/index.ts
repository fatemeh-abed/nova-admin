// Phase 1 minimal dictionary (Persian only). Full fa/en dictionary + switching arrives in Phase 3.
export const dictionary = {
  brand: 'NOVA',
  adminPanel: 'پنل مدیریت',
  welcome: 'خوش آمدید، مدیر سیستم',
  nav: {
    dashboard: 'داشبورد',
    products: 'محصولات',
    users: 'کاربران',
  },
  errors: {
    network: 'ارتباط با سرور برقرار نشد.',
    timeout: 'زمان پاسخ‌دهی سرور به پایان رسید.',
    unauthorized: 'نام کاربری یا رمز عبور نادرست است.',
    unknown: 'خطای ناشناخته‌ای رخ داد.',
  },
  placeholder: {
    comingSoon: 'این بخش در فازهای بعدی پیاده‌سازی می‌شود.',
    login: 'ورود',
  },
} as const;
