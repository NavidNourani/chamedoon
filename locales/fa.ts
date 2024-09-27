console.log("Loaded FA");

export const APP_NAME = "Cargo Tracking";

export default {
  add_cargo: {
    Cargo_created_successfully: "بار با موفقیت ایجاد شد",
    There_was_an_error_on_creating_cargo: "خطایی در ایجاد بار رخ داده است",
    Add_your_cargo_detail: "جزئیات بار خود را اضافه کنید",
    Departure_country: "کشور مبدا",
    Departure_Airport: "فرودگاه مبدا",
    Destination_country: "کشور مقصد",
    Destination_Airport: "فرودگاه مقصد",
    Cargo_Description: "توضیحات بار",
    Immediate_delivery: "تحویل فوری",
    Submit: "ارسال",
    There_was_an_error_on_getting_countries:
      "خطایی در دریافت کشورها رخ داده است",
    there_was_an_error_on_getting_cities: "خطایی در دریافت شهرها رخ داده است",

    Approximate_DateTime: "زمان تقریبی",
    "Estimated_cost_(optional)": "حدود هزینه (اختیاری)",
    Next: "بعدی",
    Back: "قبلی",
  },
  home: {
    add_new_cargo: "اضافه کردن بسته جدید",
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
    orLoginWith: "یا ورود با", // Add this line
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
