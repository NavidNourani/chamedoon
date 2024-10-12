console.log("Loaded FA");

export const APP_NAME = "Cargo Tracking";

export default {
  add_parcel: {
    Cargo_created_successfully: "بار با موفقیت ایجاد شد",
    There_was_an_error_on_creating_parcel: "خطایی در ایجاد بار رخ داده است",
    Add_your_parcel_detail: "جزئیات بار خود را اضافه کنید",
    Departure_country: "کشور مبدا",
    Departure_Airport: "فرودگاه مبدا",
    Destination_country: "کشور مقصد",
    Destination_Airport: "فرودگاه مقصد",
    parcel_description: "توضیحات بار",
    Immediate_delivery: "عجله دارم",
    Submit: "ثبت",
    There_was_an_error_on_getting_countries:
      "خطایی در دریافت کشورها رخ داده است",
    there_was_an_error_on_getting_cities: "خطایی در دریافت شهرها رخ داده است",

    Approximate_DateTime: "تاریخ تقریبی",
    Approximate_DateTime_optional: "تاریخ تقریبی (اختیاری)",
    "Estimated_cost_(optional)": "حدود هزینه (اختیاری)",
    Next: "بعدی",
    Back: "قبلی",
    dateFormat: "فرمت تاریخ",
    gregorian: "میلادی",
    jalali: "شمسی",
    Parcel_Type: "نوع بار",
    Parcel_Weight: "وزن بار تقریبی",
    Document: "مدارک",
    Other: "سایر",
  },
  parcelItem: {
    parcel_description: "توضیحات",
    departure: "مبدا",
    destination: "مقصد",
    parcel_details: "جزئیات",
    approximate_date_time: "تاریخ",
    parcel_type: "نوع",
    parcel_weight: "وزن",
    immediate_delivery: "عجله دارم",
    estimated_cost: "هزینه تقریبی",
  },
  home: {
    add_new_parcel: "اضافه کردن بسته جدید",
  },
  select_language: {
    en: "English",
    fa: "فارسی",
  },
  authorization: {
    login: "ورود",
    logout: "خروج",
  },
  loginForm: {
    formTitle: "وارد اکانت خود شوید!",
    username: "نام کاربری",
    password: "کلمه عبور",
    login: "ورود",
    signInWithGoogle: "ورود با گوگل",
    rememberMe: "مرا به خاطر بسپار", // Add this line
    dontHaveAccount: "حساب کاربری ندارید؟", // Add this line
    signUp: "ثبت نام", // Add this line
    orLoginWith: "یا ورود/ثبت نام با", // Add this line
  },
  signupForm: {
    formTitle: "فرم ثبت نام",
    username: "نام کاربری",
    name: "نام",
    family: "نام خانوادگی",
    phone: "شماره تلفن (با کد کشور)",
    password: "رمز عبور",
    telegramID: "شناسه تلگرام",
    whatsappNumber: "شماره واتساپ",
    signup: "ثبت نام",
    email: "ایمیل",
    alreadyHaveAccount: "قبلاً حساب کاربری دارید؟",
    loginButton: "ورود",
    usernameRequired: "نام کاربری الزامی است",
    usernameLength: "نام کاربری باید بین 3 تا 20 کاراکتر باشد",
    usernameFormat: "نام کاربری فقط باید شامل حروف، اعداد و زیرخط باشد",
    phoneRequired: "شماره تلفن الزامی است",
    phoneFormat: "شماره تلفن فقط باید شامل اعداد و علامت مثبت اختیاری باشد",
    passwordRequired: "رمز عبور الزامی است",
    passwordLength: "رمز عبور باید حداقل 8 کاراکتر باشد",
    registrationError: "خطایی در ثبت نام رخ داد، لطفاً دوباره تلاش کنید",
    registrationSuccess:
      "ثبت نام با موفقیت انجام شد، اکنون می‌توانید وارد شوید!",
    repeatPassword: "تکرار رمز عبور",
    repeatPasswordRequired: "لطفاً رمز عبور خود را تکرار کنید",
    passwordsMustMatch: "رمزهای عبور باید مطابقت داشته باشند",
  },
  errorPage: {
    errorTitle: "خطای احراز هویت",
    signInAgain: "ورود مجدد",
  },
  pageTitle: {
    login: `ورود | ${APP_NAME}`,
    signup: `ثبت نام | ${APP_NAME}`,
    error: `خطا | ${APP_NAME}`,
    home: `${APP_NAME}`,
    addCargo: `افزودن بار | ${APP_NAME}`,
  },
  translate: "ترجمه",
} as const;
