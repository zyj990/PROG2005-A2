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

let inventory: InventoryItem[] = [];

function showMessage(msg: string, isError: boolean = false): void {
  const el = document.getElementById('message')!;
  el.textContent = msg;
  el.style.color = isError ? '#e74c3c' : '#27ae60';
}

function isIdUnique(id: string): boolean {
  return !inventory.some(item => item.itemId === id);
}

function validateForm(
  id: string, name: string, cat: string, qty: number,
  price: number, supplier: string
): boolean {
  if (!id || !name || !cat || qty <= 0 || price <= 0 || !supplier) {
    showMessage("Please fill all required fields correctly", true);
    return false;
  }
  return true;
}