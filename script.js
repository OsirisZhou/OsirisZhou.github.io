// 1. 创建 div 元素
const centeredTextDiv = document.createElement("div");

// 2. 设置 div 的 id，方便后续修改
centeredTextDiv.id = "centeredText"; // 修改为 centeredText

// 3. 设置 div 的文本内容
centeredTextDiv.textContent = "Osiris Loves Catismple Forever.";

// 4. 将 div 添加到 body 的底部
document.addEventListener('DOMContentLoaded', function() {
  const centeredTextDiv = document.createElement("div");
  centeredTextDiv.id = "centeredText";
  centeredTextDiv.textContent = "Osiris Loves Catismple Forever.";
  document.body.appendChild(centeredTextDiv);
});


