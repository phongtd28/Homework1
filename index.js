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


const fnNumber2 = () => {
  const num1 = prompt("input number 1:");
  const num2 = prompt("input number 2:");

  if (isNaN(num1) || isNaN(num2)) {
    alert("must input number");
    return;
  }

  console.log((+num1 / +num2).toFixed(2));
};

const fnNumber3 = (price, percentage) => {
  return +(price - (price * percentage) / 100).toFixed(2);
};


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
        loop(object[key], currentKey);
      } else {
        res[currentKey] = object[key];
      }
    }
  };

  loop(obj);
  console.log(res);

  return res;
};

const filterDuplicates = (arr) => {
  return [...new Set(arr)];
};

const groupByProperty = (arrObj, prop) => {
  return arrObj.reduce((total, current) => {
    const key = current[prop];
    if (!total[key]) total[key] = [];
    total[key].push(current);

    return total;
  }, {});
};


const findMostFrequent = (arr) =>{
  let frequent = arr.reduce((total, curr) => {
     total[curr] = (total[curr] || 0) + 1 
     return total;
  }, {})

  const maxValue = Math.max(...Object.values(frequent))
  const maxKey = Object.keys(frequent).find(key => frequent[key] === maxValue)

  return {element: maxKey, count: maxValue}
  
}

const calculateCart = (items) =>{
  return items.reduce((total, item) => {
    return total + item.price * (1 - item.discount / 100);
  }, 0);
} 

const groupByCategories = (transactions) =>{
  return transactions.reduce((total, curr) =>{
    const key = curr.category
    total[key] = (total[key] || 0) + curr.amount
    return total
  },{})
}

const calculateStats = (numbers) =>{
  return numbers.reduce(
    (acc, num) => {
      acc.min = Math.min(acc.min, num);
      acc.max = Math.max(acc.max, num);
      acc.sum += num;
      return acc;
    },
    { min: Infinity, max: -Infinity, sum: 0 }
  );
}

class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('libraryBooks')) || [];
  }

  addBook(book) {
    this.books.push(book);
    this.saveToLocalStorage();
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
    this.saveToLocalStorage();
  }

  updateBook(id, updatedInfo) {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      throw new Error('Book not found.');
    }
    this.books[index] = { ...this.books[index], ...updatedInfo };
    this.saveToLocalStorage();
  }

  searchBooks(query) {
    query = query.toLowerCase();
    return this.books.filter(
      book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }

  getCategoryStats() {
    return this.books.reduce((stats, book) => {
      stats[book.category] = (stats[book.category] || 0) + 1;
      return stats;
    }, {});
  }

  sortBooks(by = 'price', order = 'asc') {
    const multiplier = order === 'asc' ? 1 : -1;
    this.books.sort((a, b) => (a[by] - b[by]) * multiplier);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('libraryBooks', JSON.stringify(this.books));
  }
}

class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
  }

  addItem(item) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.saveToLocalStorage();
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToLocalStorage();
  }

  updateItemQuantity(id, quantity) {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      throw new Error('Item not found.');
    }

    if (quantity <= 0) {
      this.removeItem(id);
    } else {
      item.quantity = quantity;
    }
    this.saveToLocalStorage();
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  }

  filterByPriceRange(min, max) {
    return this.items.filter(item => item.price >= min && item.price <= max);
  }

  searchItems(query) {
    query = query.toLowerCase();
    return this.items.filter(item => item.name.toLowerCase().includes(query));
  }

  saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
}
