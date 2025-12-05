// global.d.ts

declare interface Window {
  google: {
    translate: {
      TranslateElement: {
        new (config: object, elementId: string): void;

        InlineLayout: {
          SIMPLE: number;
        };
      };
    };
  };
  googleTranslateElementInit: () => void;
}
