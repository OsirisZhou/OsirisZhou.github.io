// 1. 创建 div 元素
const centeredTextDiv = document.createElement("div");

// 2. 设置 div 的 id，方便后续修改
centeredTextDiv.id = "centerText";

// 3. 设置 div 的文本内容
centeredTextDiv.textContent = "Osiris Loves Catismple Forever.";

// 4. 将 div 添加到 body 的底部
document.body.appendChild(centeredTextDiv);

// (可选) 动态修改文本内容
// setTimeout(function() {
//   centeredTextDiv.textContent = "Updated Copyright Text!";
// }, 5000); // 5秒后更新文本
