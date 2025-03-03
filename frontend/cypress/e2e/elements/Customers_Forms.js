class ForsElements {
    iconForms = () => { return ".card-body", "Forms"}
    selectPracticeForms = () => { return "span", "Practice Form"}
    firstName = () => { return "input[placeholder='First Name']"} 
    lastName = () => { return "input[placeholder='Last Name']"}
    email = () => {return "#userEmail"}

    gender = () => { return 'input[value="Male"]' }
    numberPhone = () => { return "//input[@pattern='\\d*']" }
    dateBirth = () => { return '#dateOfBirthInput' }
    month = () => { return "select.react-datepicker__month-select" }
    year = () => { return "select.react-datepicker__year-select" }
    day = () => { return ".react-datepicker__day--023" }
} export default ForsElements