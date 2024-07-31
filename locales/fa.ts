console.log("Loaded FA");

export default {
  add_cargo: {
    Cargo_created_successfully: "بار با موفقیت ایجاد شد",
    There_was_an_error_on_creating_cargo: "خطایی در ایجاد بار رخ داده است",
    Add_your_cargo_detail: "جزئیات بار خود را اضافه کنید",
    Departure_country: "کشور مبدا",
    Departure_City: "شهر مبدا",
    Destination_country: "کشور مقصد",
    Destination_City: "شهر مقصد",
    Cargo_Description: "توضیحات بار",
    Immediate_delivery: "تحویل فوری",
    Submit: "ارسال",
    There_was_an_error_on_getting_countries:
      "خطایی در دریافت کشورها رخ داده است",
    there_was_an_error_on_getting_cities: "خطایی در دریافت شهرها رخ داده است",

    Approximate_DateTime: "زمان تقریبی",
    "Estimated_cost_(optional)": "حدود هزینه (اختیاری)",
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
  },
} as const;
