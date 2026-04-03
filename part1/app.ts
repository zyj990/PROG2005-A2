// 库存项接口（严格类型定义，符合作业要求）
interface InventoryItem {
  itemId: string;
  itemName: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isPopular: boolean;
  comment?: string;
}

// 内存数据库（会话级存储，关闭浏览器重置）
let inventory: InventoryItem[] = [];

// ====================== 工具函数 ======================
// 显示操作消息（替代alert，符合作业要求）
function showMessage(msg: string, isError: boolean = false): void {
  const el = document.getElementById('message')!;
  el.textContent = msg;
  el.style.color = isError ? '#e74c3c' : '#27ae60';
}

// 校验Item ID唯一性（作业要求ID唯一）
function isIdUnique(id: string): boolean {
  return !inventory.some(item => item.itemId === id);
}

// 表单完整性校验（必填项非空、数字合法）
function validateForm(
  id: string, name: string, cat: string, qty: number,
  price: number, supplier: string
): boolean {
  if (!id || !name || !cat || qty <= 0 || price <= 0 || !supplier) {
    showMessage('All required fields must be valid!', true);
    return false;
  }
  return true;
}

// ====================== 核心业务函数（与HTML onclick完全对应） ======================
// 添加物品
function addItem(): void {
  // 获取表单值
  const itemId = (document.getElementById('itemId') as HTMLInputElement).value.trim();
  const itemName = (document.getElementById('itemName') as HTMLInputElement).value.trim();
  const category = (document.getElementById('category') as HTMLSelectElement).value as any;
  const quantity = Number((document.getElementById('quantity') as HTMLInputElement).value);
  const price = Number((document.getElementById('price') as HTMLInputElement).value);
  const supplierName = (document.getElementById('supplier') as HTMLInputElement).value.trim();
  const stockStatus = (document.getElementById('stockStatus') as HTMLSelectElement).value as any;
  const isPopular = (document.getElementById('isPopular') as HTMLSelectElement).value === 'true';
  const comment = (document.getElementById('comment') as HTMLTextAreaElement).value.trim();

  // 校验
  if (!validateForm(itemId, itemName, category, quantity, price, supplierName)) return;
  if (!isIdUnique(itemId)) {
    showMessage('Item ID already exists!', true);
    return;
  }

  // 构造新物品并添加
  const newItem: InventoryItem = {
    itemId, itemName, category, quantity, price,
    supplierName, stockStatus, isPopular, comment: comment || undefined
  };

  inventory.push(newItem);
  showMessage('Item added successfully!');
  resetForm();
  displayAll();
}

// 更新物品（按名称匹配，作业要求）
function updateItem(): void {
  const itemName = (document.getElementById('itemName') as HTMLInputElement).value.trim();
  const index = inventory.findIndex(i => i.itemName === itemName);

  if (index === -1) {
    showMessage('Item not found!', true);
    return;
  }

  // 获取更新值
  const category = (document.getElementById('category') as HTMLSelectElement).value as any;
  const quantity = Number((document.getElementById('quantity') as HTMLInputElement).value);
  const price = Number((document.getElementById('price') as HTMLInputElement).value);
  const supplierName = (document.getElementById('supplier') as HTMLInputElement).value.trim();
  const stockStatus = (document.getElementById('stockStatus') as HTMLSelectElement).value as any;
  const isPopular = (document.getElementById('isPopular') as HTMLSelectElement).value === 'true';
  const comment = (document.getElementById('comment') as HTMLTextAreaElement).value.trim();

  // 更新数据（保留原ID）
  inventory[index] = {
    ...inventory[index],
    category, quantity, price, supplierName,
    stockStatus, isPopular, comment: comment || undefined
  };

  showMessage('Item updated successfully!');
  displayAll();
}

// 删除物品（按名称匹配，作业要求）
function deleteItem(): void {
  const itemName = (document.getElementById('searchName') as HTMLInputElement).value.trim();
  if (!itemName) {
    showMessage('Please enter item name to delete', true);
    return;
  }

  if (!confirm('Are you sure you want to delete this item?')) return;

  const originalLength = inventory.length;
  inventory = inventory.filter(i => i.itemName !== itemName);

  if (inventory.length < originalLength) {
    showMessage('Item deleted successfully!');
    displayAll();
  } else {
    showMessage('Item not found!', true);
  }
}

// 搜索物品（按名称模糊匹配）
function searchItem(): void {
  const keyword = (document.getElementById('searchName') as HTMLInputElement).value.toLowerCase();
  const filteredItems = inventory.filter(i => i.itemName.toLowerCase().includes(keyword));
  renderItems(filteredItems);
}

// 显示全部物品
function displayAll(): void {
  renderItems(inventory);
}

// 显示热门物品（isPopular为true）
function displayPopular(): void {
  const popularItems = inventory.filter(item => item.isPopular);
  renderItems(popularItems);
}

// 渲染物品列表到页面（核心UI更新）
function renderItems(items: InventoryItem[]): void {
  const listEl = document.getElementById('itemList')!;

  if (items.length === 0) {
    listEl.innerHTML = '<p>No items to display</p>';
    return;
  }

  // 生成卡片式UI
  listEl.innerHTML = items.map(item => `
    <div class="item-card">
      <h3>${item.itemName} (ID: ${item.itemId})</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Quantity:</strong> ${item.quantity} | <strong>Price:</strong> $${item.price.toFixed(2)}</p>
      <p><strong>Supplier:</strong> ${item.supplierName}</p>
      <p><strong>Stock Status:</strong> ${item.stockStatus} | <strong>Popular:</strong> ${item.isPopular ? 'YES' : 'NO'}</p>
      ${item.comment ? `<p><strong>Comment:</strong> ${item.comment}</p>` : ''}
    </div>
  `).join('');
}

// 重置表单（清空输入框，清除消息）
function resetForm(): void {
  (document.getElementById('itemId') as HTMLInputElement).value = '';
  (document.getElementById('itemName') as HTMLInputElement).value = '';
  (document.getElementById('quantity') as HTMLInputElement).value = '';
  (document.getElementById('price') as HTMLInputElement).value = '';
  (document.getElementById('supplier') as HTMLInputElement).value = '';
  (document.getElementById('comment') as HTMLTextAreaElement).value = '';
  showMessage('');
}
