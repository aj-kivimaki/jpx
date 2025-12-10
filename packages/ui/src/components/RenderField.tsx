import type { ReactNode } from 'react';

interface RenderFieldProps {
  readonly icon: ReactNode;
  readonly content?: string | null;
  readonly className?: string;
}

export function RenderField({ icon, content, className }: RenderFieldProps) {
  if (!content) return null;

  return (
    <div className={className}>
      {icon}
      <span>{content}</span>
    </div>
  );
}
