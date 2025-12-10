import type { ReactNode } from 'react';

interface RenderFieldProps {
  icon: ReactNode;
  content?: string | null;
  className?: string;
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
