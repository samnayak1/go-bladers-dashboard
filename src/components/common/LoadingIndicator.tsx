interface LoadingIndicatorProps {
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text = "Loading..." }) => {
  return (
    <div className="mb-6 text-gray-300">
      {text}
    </div>
  );
};

export default LoadingIndicator;