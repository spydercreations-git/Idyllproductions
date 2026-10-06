declare module 'lucide-react/dist/esm/icons/*' {
  import { FC, SVGProps } from 'react';
  interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  const Icon: FC<LucideProps>;
  export default Icon;
}
