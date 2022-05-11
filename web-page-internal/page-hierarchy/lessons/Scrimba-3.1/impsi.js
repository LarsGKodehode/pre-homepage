// conversion object
class conversionEntry {
  constructor(type, unit1, unit2, unit1DivideUnit2) {
    this.type = type;
    this.unit1 = unit1;
    this.ratio1 = unit1DivideUnit2;
    this.unit2 = unit2;
    this.ratio2 = 1 / unit1DivideUnit2;
  };
};

// program class  
class converter {
  // Public
  run() {
    if (!this.#getInputInt() === true) {return}; // abort if can't parse input to real number
    this.#convertAll();
    this.#updateOutput();
  };
  
  // Private
  #currentInput; // last valid input for reuse across calls
  #convertedInput = []; // stores converted values in a convenient format
  
  // tests and parses input to number
  #getInputInt() {
    let newInput = Number(input.value);
    if (!(typeof(newInput)) === "number" || (isNaN(newInput))) {return false}; // TODO: might get away with only checking for NAN
    this.#currentInput = newInput;
    return true;
  };
  
  // converts currentInput to all registered types
  #convertAll() {
    for (const entry in conversionBook) {
      this.#convertedInput[entry] = [conversionBook[entry].ratio1, conversionBook[entry].ratio2];
    };
  };

  // updates output fields
  #updateOutput() {
    for (const entry in outputFields) {
    	console.log(`logging entry ${entry}`)
      console.log(outputFields[entry]);
    };
  };
};

// array of all conversions
let conversionBook = [];
// inserts conversions
conversionBook.push(new conversionEntry("lenght", "feet", "meter", 0.3048));
conversionBook.push(new conversionEntry("volume", "imperial gallon", "litre", 4.54609));
conversionBook.push(new conversionEntry("mass", "pound", "kilogram", 0.45359237));

// selects input field
const input = document.getElementById("input-field")
// selects output fields
const outputHeader = document.getElementsByClassName("info-block-description");
const outputFields = document.getElementsByClassName("output-field");

// create program
const program = new converter;
// necesarry for passing correct instance of this to program
// might be a more javascriptesque way, (arrow functions lexical this)
function programWrapper() {
  program.run();
};

// run program on input field change
input.addEventListener("input", programWrapper);