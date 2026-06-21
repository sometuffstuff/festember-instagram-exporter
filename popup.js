document.getElementById("version").textContent = chrome.runtime.getManifest().version;

document.getElementById("export").addEventListener("click", async () => {
  const status = document.getElementById("status");

  status.className = "";
  status.textContent = "";

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.url || !tab.url.match(/^https:\/\/www\.instagram\.com\/p\//)) {
    status.className = "error";
    status.textContent = "Open an Instagram post first.";

    return;
  }

  status.textContent = "Exporting...";

  chrome.tabs.sendMessage(
    tab.id,
    {
      action: "exportComments",
    },
    (response) => {
      if (chrome.runtime.lastError) {
        status.className = "error";

        status.textContent = "Failed to connect to page.";

        return;
      }

      if (!response || !response.success) {
        status.className = "error";

        status.textContent = response?.error || "No comments found.";

        return;
      }

      status.className = "success";

      status.textContent = `Exported ${response.count} comments`;
    },
  );
});
