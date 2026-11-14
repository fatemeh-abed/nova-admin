import type { ApiErrorCode } from '../types/Enums/ApiErrorCode';

export interface Dictionary {
  common: {
    brand: string;
    welcome: string;
    loading: string;
    retry: string;
    search: string;
    add: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    view: string;
    actions: string;
    noData: string;
  };
  navigation: {
    dashboard: string;
    products: string;
    users: string;
    settings: string;
  };
  authentication: {
    title: string;
    username: string;
    password: string;
    login: string;
    logout: string;
    subtitle: string;
    signingIn: string;
    mockNotice: string;
  };
  dashboard: {
    title: string;
    totalProducts: string;
    totalUsers: string;
    shortcuts: string;
  };
  products: {
    previousPage: string;
    nextPage: string;
    title: string;
    addProduct: string;
    searchPlaceholder: string;
    image: string;
    productTitle: string;
    description: string;
    category: string;
    price: string;
    rating: string;
    imageUrl: string;
    empty: string;
  };
  users: {
    title: string;
    addUser: string;
    searchPlaceholder: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    empty: string;
  };
  settings: {
    title: string;
    language: string;
    theme: string;
    lightTheme: string;
    darkTheme: string;
    persian: string;
    english: string;
    adminProfile: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    invalidUrl: string;
    invalidNumber: string;
    positiveNumber: string;
    tooShort: string;
  };
  messages: {
    comingSoon: string;
    productCreated: string;
    userCreated: string;
    errors: Record<ApiErrorCode, string>;
  };
}
