/*
Utility whitelist based input sanitizer for cleaning of external strings.
Theres probably safer ones out there, but I wanted an axcuse for some practice creating a Utility Class(/module)
*/
class Sanitize {
  stringToLatinString = (string) => {
    let char;
    for (let i = 0; i < string.length; i++) {// What happens if "string" don't have .length?
      char = string
    };
  };

  urlToUrl = (url) => {

  };

};

export const Sanitize = new Sanitize();