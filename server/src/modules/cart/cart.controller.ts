import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import products, { Product } from '../../products';

interface CartItem extends Product {
  quantity: number;
}

interface Cart {
  cartItems: CartItem[];
}

const initialCart = (indexes: number[]): Cart => ({
  cartItems: indexes.map((i) => ({ 
    ...products[i],
    quantity: 1,
  })),
});

@Controller('cart')
export class CartController {
  // Maps user id to a cart 
  private carts: Record<number, Cart> = {
    1: initialCart([0, 2, 4]),
    2: initialCart([1, 3]),
  };

  constructor() {}

  // Get the list of products in the cart
  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@Request() req): Promise<Cart> {
    return this.carts[req.user.userId] ?? { cartItems: [] };
  }
  
  // Add a product to the cart
  @Post()
  @UseGuards(JwtAuthGuard)
  async add(@Request() req, @Body() {id} : {id: string}): Promise<Cart> {
    const cart = this.carts[req.user.userId];
    const cartItem = cart.cartItems.find(
      (item) => item.id === parseInt(id),
      );
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.cartItems.push({ 
          ...products.find((product) => product.id === parseInt(id)), 
          quantity: 1,
        });
      }
      return cart;
    }
    
    @Delete()
    @UseGuards(JwtAuthGuard)
    async destroy(@Request() req): Promise<Cart> {
      this.carts[req.user.userId] = { cartItems: [] };
      return this.carts[req.user.userId];
    }

}
