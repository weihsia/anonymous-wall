const scriptURL = "https://script.google.com/macros/s/AKfycbxAuGCfZwLeXCJvbqqROF_Vt1qgU5eKB40wfQ2p8QMBr5utBET2hUUYDSsmy3P9OflgqQ/exec"; // 請改成你的 Apps Script 網址

function submitPost() {
  const content = document.getElementById("postContent").value.trim();
  if (content === "") {
    alert("請輸入一些內容！");
    return;
  }
  fetch(scriptURL, {
    method: "POST",
    body: new URLSearchParams({ content: content }),
  })
    .then(response => response.text())
    .then(() => {
      document.getElementById("postContent").value = "";
      loadPosts();
    })
    .catch(error => alert("投稿失敗：" + error));
}

function loadPosts() {
  fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
      const postsDiv = document.getElementById("posts");
      postsDiv.innerHTML = "";
      data.reverse().forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
          <p>${post.content}</p>
          <small>${new Date(post.timestamp).toLocaleString()}</small>
        `;
        postsDiv.appendChild(div);
      });
    });
}

window.onload = loadPosts;

