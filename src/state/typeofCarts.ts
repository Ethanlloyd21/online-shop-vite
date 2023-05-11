export interface CartItemProps {
    id: string;
    category: string;
    brand: string;
    name: string;
    price: number;
    top_description: string;
    image: string;
    amount: number;
  }
  export interface InitialStateInterface {
    cartItems: any;
    amount: number;
    total: number;
    isLoading: boolean;
    error: string | null
  }
  
  export interface InitialStateStore {
    storeInventory: any;
    isLoading: boolean;
    error: any;
  }
  