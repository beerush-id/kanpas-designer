import { persistent } from "@beerush/reactor";

export type AppSettings = {
  domain: string;
};

export const settings = persistent<AppSettings>('app-settings', {
  domain: 'www.myapp.com'
});