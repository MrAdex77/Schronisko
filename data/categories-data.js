import Category from "../models/category";
export const CATEGORIES = [
  new Category("AnimalsOverview", "Przegląd Zwierząt", "#f5428d"),
  new Category("News", "Aktualności",  "#47fce"),
  new Category("Donation", "Darowizna", "#f5d142"),
  new Category("Statistics", "Statystyki", "#368dff"),
  new Category("SignUpOnWalk","Umów się na spacer","#47fce"),
  new Category("Appointment", "Krokomierz", "#f54242"),
  new Category("Login", "Zaloguj się", "#47fced"),
  new Category("Contact","Kontakt","#47fce"),
  
];
export const ADMINCATEGORIES =[
  new Category("AdminProducts", "Twoje zwierzęta", "#f5428d"),
  new Category("EditAnimal", "Dodaj zwierzaka", "#ffc7ff"),
  new Category("AddNews","Dodaj aktualności","#47fce"),
  new Category("SurveyOverview","Przegląd ankiet","#47fce")

];