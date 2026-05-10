import { type ReactNode } from "react";

interface StreamContainerProps {
  children: ReactNode;
  className?: string;
}

const StreamContainer: React.FC<StreamContainerProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className={`w-full max-w-5xl ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default StreamContainer;