import { Component } from '@angular/core';

interface InventoryItem {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: string;
  isPopular: boolean;
  comment?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false  // 👈 关键：添加这一行，关闭 standalone
})
export class AppComponent {
  inventory: InventoryItem[] = [];
  message = '';

  itemId = '';
  itemName = '';
  category = '';
  quantity = 0;
  price = 0;
  supplierName = '';
  stockStatus = 'In Stock';
  isPopular = false;
  comment = '';

  showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => this.message = '', 3000);
  }

  addItem() {
    const found = this.inventory.find(i => i.itemId === this.itemId);
    if (found) {
      this.showMessage('ID already exists!');
      return;
    }

    this.inventory.push({
      itemId: this.itemId,
      itemName: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplierName: this.supplierName,
      stockStatus: this.stockStatus,
      isPopular: this.isPopular,
      comment: this.comment
    });

    this.showMessage('Item added!');
    this.reset();
  }

  reset() {
    this.itemId = '';
    this.itemName = '';
    this.category = '';
    this.quantity = 0;
    this.price = 0;
    this.supplierName = '';
    this.stockStatus = 'In Stock';
    this.isPopular = false;
    this.comment = '';
  }
}
