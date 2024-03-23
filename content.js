chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'fillForm') {
    await fillFormFields();
  }
});

async function fillFormFields() {
  const formFields = document.querySelectorAll('input, select, textarea');
  formFields.forEach(function (field) {
    if (field.type === 'text' || field.type === 'email' || field.type === 'password' || field.nodeName === 'TEXTAREA') {
      field.value = generateRandomData();
    }
    if (field.type === 'checkbox') {
      field.checked = Math.random() > 0.5;
    }
    if (field.type === 'radio') {
      field.checked = Math.random() > 0.5;
    }
    if (field.type === 'number') {
      field.value = Math.floor(Math.random() * 100); // Fill with random number between 0 and 100
    }
    if (field.type === 'color') {
      field.value = generateRandomColor();
    }
    if (field.nodeName === 'SELECT') {
      const options = field.options;
      const randomIndex = Math.floor(Math.random() * options.length);
      options[randomIndex].selected = true;
    }
  });
}

function generateRandomData() {
  return 'RandomData';
}

function generateRandomColor() {
  // Generate a random color in hexadecimal format
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
