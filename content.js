chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'fillForm') {
    await fillFormFields();
  }
});

async function fillFormFields() {
  const formFields = document.querySelectorAll('input, select, textarea');
  formFields.forEach(function (field) {
    const fieldType = field.type;
    const fieldNodeName = field.nodeName;
    const fieldName = field.name.toLowerCase();
    const fieldLength = (field.maxLength > 0) ? field.maxLength : 10;
    const fieldMax = field.max;
    const fieldMin = field.min;

    const validFieldTypes = ['text', 'email', 'password', 'tel', 'number', 'color', 'range', 'date'];
    if (validFieldTypes.includes(fieldType) || fieldNodeName === 'TEXTAREA') {
      field.value = generateRandomData(fieldType, fieldLength, fieldName, fieldMax, fieldMin);
    }
    else if (fieldType === 'checkbox' || fieldType === 'radio') {
      field.checked = Math.random() > 0.5;
    }
    else if (fieldNodeName === 'SELECT') {
      const options = field.options;
      const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
      options[randomIndex].selected = true;
    }
  });
}

function generateRandomData(fType, fLength, fName, fMax, fMin) {

  switch (fType) {
    case 'text':
      if (fName.includes("name")) {
        const namesArray = [
          'john', 'carlos', 'charles', 'heisenberg', 'goodman', 'stark', 'alfred', 'bruce', 'sergio', 'clark', 'henry', 'jason', 'scarlet', 'stanley', 'dona', 'jesse', 'emily', 'willis'
        ];
        let fullName = '';
        for (let i = 0; i < 2; i++) {
          fullName = fullName.concat(namesArray[Math.floor(Math.random() *  namesArray.length)] + ' ');
        }
        var randomData = fullName;
      }
      else {
        var randomData = randomString(fLength, ["A", "Z"], ["a", "z"]);
      }
      break;
    case 'email':
      var randomData = randomString(10, ["a", "z"], ["0", "9"]) + "@eztestff.io";
      break;
    case 'password':
      var randomData = randomString(9, ["A", "Z"], ["a", "z"]) + "@" + randomString(5, ["0", "9"]) + "*";
      break;
    case 'tel':
      var randomData = randomString(10, ["0", "9"]);
      break;
    case 'number':
      var randomData = Math.floor(Math.random() * fLength) + 1;
      break;
    case 'color':
      var randomData = "#" + randomString(6, ["A", "F"], ["0", "9"]);
      break;
    case 'range':
      var randomData = Math.floor(Math.random() * (fMax - fMin + 1) + fMin);
      break;
    case 'date':
      var randomData = generateRandomDate(fMin, fMax);
      break;
    default:
      const wordsArray = [
        'sunflowers', 'bloom', 'brightly', 'in', 'the', 'warm', 'summer', 'breeze', 'under', 'a', 'clear', 'blue', 'sky', 'near', 'the', 'rolling', 'green', 'hills'
      ];
      let phrase = '';
      for (let i = 0; i <= fLength; i++) {
        if (phrase.length + 10 < fLength) {
          phrase = phrase.concat(wordsArray[Math.floor(Math.random() *  wordsArray.length)] + ' ');
        }
        else {
          break;
        }
      }
      var randomData = phrase;
  }
  return randomData;
}

function generateRandomDate(minDateStr, maxDateStr) {
  let minDate = minDateStr ? new Date(minDateStr) : new Date(0);
  let maxDate = maxDateStr ? new Date(maxDateStr) : new Date();
  let randomTime = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

function randomString(length, ...ranges) {
  var str = "";
  while(length--) {
    let i = Math.floor(Math.random() * ranges.length);
    let min = ranges[i][0].charCodeAt(0),
        max = ranges[i][1].charCodeAt(0);
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    str += String.fromCharCode(result);
  }
  return str;
}
