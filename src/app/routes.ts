export const ROUTES = {
  HOME: "/",
  CART: "/cart",
  PRODUCT: (id = ":id") => `/products/${id}`,
};