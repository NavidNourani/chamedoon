console.log("Loaded EN");

export const APP_NAME = "Cargo Tracking";

export default {
  add_cargo: {
    Cargo_created_successfully: "Cargo created successfully",
    There_was_an_error_on_creating_cargo:
      "There was an error on creating cargo",
    Add_your_cargo_detail: "Add your cargo detail",
    Departure_country: "Departure country",
    Departure_Airport: "Departure Airport",
    Destination_country: "Destination country",
    Destination_Airport: "Destination Airport",
    Cargo_Description: "Cargo Description",
    Immediate_delivery: "Immediate delivery",
    Submit: "Submit",
    There_was_an_error_on_getting_countries:
      "There was an error on getting countries",
    there_was_an_error_on_getting_cities:
      "There was an error on getting cities",
    Approximate_DateTime: "Approximate Date",
    Approximate_DateTime_optional: "Approximate Date (optional)",
    "Estimated_cost_(optional)": "Estimated cost (optional)",
    Next: "Next",
    Back: "Back",
    dateFormat: "Date format",
    gregorian: "Gregorian",
    jalali: "Jalali",
  },
  home: {
    add_new_cargo: "Add new cargo",
  },
  select_language: {
    en: "English",
    fa: "فارسی",
  },
  authorization: {
    login: "Login",
    logout: "Logout",
  },
  loginForm: {
    formTitle: "Login to your account",
    username: "Username",
    password: "Password",
    login: "Login",
    signInWithGoogle: "Sign in with Google",
    rememberMe: "Remember me",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign up",
    orLoginWith: "Or login/register with",
  },
  signupForm: {
    formTitle: "Signup Form",
    username: "Username",
    name: "Name",
    family: "Family",
    phone: "Phone (with country code)",
    password: "Password",
    telegramID: "Telegram ID",
    whatsappNumber: "WhatsApp number",
    signup: "Sign up",
    email: "E-mail",
    alreadyHaveAccount: "Already have an account?",
    loginButton: "Login",
    usernameRequired: "Username is required",
    usernameLength: "Username must be between 3 and 20 characters",
    usernameFormat:
      "Username must contain only alphanumeric characters and underscores",
    phoneRequired: "Phone number is required",
    phoneFormat: "Phone number must contain only digits and optional plus sign",
    passwordRequired: "Password is required",
    passwordLength: "Password must be at least 8 characters",
    registrationError: "There was an error on sign up, try again",
    registrationSuccess: "Registered successfully, you can login now!",
    repeatPassword: "Repeat Password",
    repeatPasswordRequired: "Please repeat your password",
    passwordsMustMatch: "Passwords must match",
  },
  errorPage: {
    errorTitle: "Authentication Error",
    signInAgain: "Sign In Again",
  },
  pageTitle: {
    login: `Login | ${APP_NAME}`,
    signup: `Sign Up | ${APP_NAME}`,
    error: `Error | ${APP_NAME}`,
    addCargo: `Add Cargo | ${APP_NAME}`,
    home: `${APP_NAME}`,
    // Add more page titles as needed
  },
  translate: "Translate",
} as const;
