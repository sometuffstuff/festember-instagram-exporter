chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action !== "exportComments") return;

  const comments = [];

  const seen = new Set();

  const replys = Array.from(document.querySelectorAll("*")).filter((el) => el.innerText && el.innerText.trim() === "Reply");

  console.log("Reply count:", replys.length);

  if (replys.length > 0) {
    console.log("First reply element:", replys[0]);

    console.log("First reply outerHTML:", replys[0].outerHTML);
  }

  for (const reply of replys) {
    let cur = reply;

    let data = null;

    while (cur) {
      const txt = cur.innerText || "";

      const lines = txt
        .split("\n")
        .map((x) => x.trim())
        .filter((x) => x);

      if (txt.includes("Reply") && lines.length >= 4) {
        const timeEl = cur.querySelector("time");

        data = {
          text: txt,
          timestamp: timeEl ? timeEl.getAttribute("datetime") : null,
        };

        break;
      }

      cur = cur.parentElement;
    }

    if (!data) continue;

    const lines = data.text
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x);

    if (comments.length < 3) {
      console.log("LINES:", lines);
    }

    const comment = {
      username: lines[0],
      comment: lines[2],
      timestamp: data.timestamp,
    };

    const key = comment.username + "|" + comment.comment + "|" + comment.timestamp;

    if (seen.has(key)) continue;

    seen.add(key);

    comments.push(comment);
  }

  if (comments.length === 0) {
    sendResponse({
      success: false,
      error: "No comments found. Make sure comments are loaded and expanded.",
    });

    return true;
  }

  console.log(`Exported ${comments.length} comments`);

  const postUrl = window.location.href;

  const postCodeMatch = postUrl.match(/\/p\/([^\/]+)/);

  const now = new Date();
  const timestamp =
    String(now.getDate()).padStart(2, "0") +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    now.getFullYear() +
    "_" +
    String(now.getHours()).padStart(2, "0") +
    "-" +
    String(now.getMinutes()).padStart(2, "0");

  const exportData = {
    postUrl,
    postCode: postCodeMatch ? postCodeMatch[1] : null,
    timestamp: timestamp,
    commentCount: comments.length,
    extensionVersion: chrome.runtime.getManifest().version,
    comments,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  const postCode = exportData.postCode || "unknown";

  a.download = `${postCode}_${timestamp}.json`;

  document.body.appendChild(a);

  a.click();

  a.remove();

  URL.revokeObjectURL(url);

  sendResponse({
    success: true,
    count: comments.length,
  });

  return true;
});
