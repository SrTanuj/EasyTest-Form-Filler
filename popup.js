const fillButton = document.querySelector('.easyTest-button');

document.addEventListener('DOMContentLoaded', async () => {
  fillButton.addEventListener('click', async () => {
		let tabs = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.sendMessage(tabs[0].id, {action: 'fillForm'});
  });
});
