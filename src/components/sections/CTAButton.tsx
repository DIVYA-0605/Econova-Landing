import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  openInNewTab?: boolean;
  className?: string;
}

export default function CTAButton({ 
  text, 
  link, 
  variant = 'primary', 
  size = 'medium',
  openInNewTab = false,
  className = '' 
}: CTAButtonProps) {
  const baseStyles = 'inline-block font-semibold rounded-lg transition-all duration-300 transform hover:scale-105';
  
  const variantStyles = {
    primary: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white hover:bg-gray-100 text-green-600 border-2 border-green-600'
  };
  
  const sizeStyles = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg'
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // Check if it's an internal link
  const isInternal = link.startsWith('/') || link.startsWith('#');

  // Force external behavior if openInNewTab is true
  if (isInternal && !openInNewTab) {
    return (
      <Link href={link} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <a 
      href={link} 
      target={openInNewTab ? "_blank" : "_self"}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={buttonClasses}
    >
      {text}
    </a>
  );
}