interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  onRetry?: () => void;
  variant?: "default" | "auth";
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onClose, 
  onRetry,
  variant = "default"
}) => {

  const variantStyles = {
    default: "bg-red-500/10 border-red-500 text-red-500",
    auth: "bg-red-500/20 border-red-500 text-red-400",
  };

  return (
    <div className={`${variantStyles[variant]} border rounded-lg p-4 mb-6 flex justify-between items-center`}>
      <div className="flex items-center gap-3 flex-1">
        <span>{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
          >
            Retry
          </button>
        )}
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 hover:opacity-70 text-lg font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;