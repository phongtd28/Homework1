/* Number */

const fnNumber1 = () => {
  const num1 = prompt("input number 1:");
  const num2 = prompt("input number 2:");

  if (isNaN(num1) || isNaN(num2)) {
    alert("must input number");
    return;
  }

  console.log(+num1 + +num2);
};

fnNumber1();

const fnNumber2 = () => {
  const num1 = prompt("input number 1:");
  const num2 = prompt("input number 2:");

  if (isNaN(num1) || isNaN(num2)) {
    alert("must input number");
    return;
  }

  console.log((+num1 / +num2).toFixed(2));
};
fnNumber2();

const fnNumber3 = (price, percentage) => {
  return +(price - (price * percentage) / 100).toFixed(2);
};

fnNumber3();

/* String */
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
    .join(" ");
};

const countVowels = (str) => {
  const vowels = "aeiou";
  let counter = 0;
  str
    .toLowerCase()
    .split(" ")
    .forEach((word) => {
      const length = [...new Set(word)].filter((c) =>
        vowels.includes(c)
      ).length;
      counter += length;
    });
  console.log(counter);
};

countVowels("hello world");

const palindromeCheck = (str) => {
  const strClean = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return strClean === strClean.split("").reverse().join("");
};
palindromeCheck();

const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  for (let key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key]);
  }

  return clone;
};

const flattenObject = (obj) => {
  let res = {};
  const loop = (object, parentKey = "") => {
    for (let key in object) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof object[key] === "object" && !Array.isArray(object[key])) {
        loop(object, currentKey);
      } else {
        res[currentKey] = object[key];
      }
    }
  };

  loop(obj)

  return res;
};
