'use client';

import MobileMenuContent from './mobile-menu-content';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return <MobileMenuContent onClose={onClose} />;
}
