declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src: string;
        alt: string;
        poster?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        ar?: boolean;
        'ar-modes'?: string;
        'shadow-intensity'?: string;
        'disable-zoom'?: boolean;
        'disable-pan'?: boolean;
        'field-of-view'?: string;
        'environment-image'?: string;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}
