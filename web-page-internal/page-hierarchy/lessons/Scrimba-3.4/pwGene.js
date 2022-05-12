// container for available output fields
let outputFields = [];
const documentOutputFields = document.getElementsByClassName("output-field");

// how many symbols in password
const passwordLength = 16;

// this is a sensible selection of utf-8 charecters
const alphabetStart = 33;
const alphabetEnd = 127;
const alphabetSize = alphabetEnd - alphabetStart;

// gets called on button click
function submit() {
  for (field in documentOutputFields) {
    let newPassword = "";
    for (i = 0; i < passwordLength; i++) {
      newPassword += String.fromCharCode(Math.floor(Math.random() * alphabetSize + alphabetStart));
    };
    documentOutputFields[field].value = newPassword;
  };
};