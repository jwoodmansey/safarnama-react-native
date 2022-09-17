import "react-i18next";
import { resources } from "../../i18n/config";

declare module "react-i18next" {
  interface CustomTypeOptions {
    // defaultNS: typeof 'en';
    resources: typeof resources["en"];
  }
}
