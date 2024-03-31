chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: "copySlug",
      title: "Copy Slug",
      contexts: ["link"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copySlug") {
      if (chrome.scripting && tab.id) {
          chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: copySlug,
              args: [info.linkUrl],
          }).catch(error => console.error('Error executing script:', error));
      } else {
          console.error('Scripting API is not available.');
      }
  }
});

function copySlug(linkUrl) {
  const url = new URL(linkUrl);
  const slug = url.pathname.split('/').pop();
  navigator.clipboard.writeText(slug).then(() => {
      console.log('Slug copied to clipboard');
  }, (error) => {
      console.error('Error copying slug to clipboard:', error);
  });
}
