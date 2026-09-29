import useCartStore from '@/store/cartStore';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const cart = useCartStore((state) => state.cart);

  const count = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarBadge: count > 0 ? count : undefined,
        }}
      />
    </Tabs>
  );
}
