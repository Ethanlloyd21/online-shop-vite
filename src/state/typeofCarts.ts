
  export interface InitialStateInterface {
    cartItems: CartItemProps[];
    amount: number;
    total: number;
    isLoading: boolean;
    error: unknown;
  }


export interface CartItemProps {
  title: string | undefined;
  artist: string;
  src: string;
  description: string;
  price: number;
  avgRating: number;
  reviews: number;
  inStock: number;
  readyForPickup: boolean;
  bestSeller: boolean;
  isNew: boolean;
  limitedSupply: boolean;
  id: string;
  amount: number;
}

  export interface InitialStateStore {
    storeInventory: unknown | any;
    isLoading: boolean;
    error: unknown;
  }
  