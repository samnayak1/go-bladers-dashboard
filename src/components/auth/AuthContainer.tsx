interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {title}
        </h1>

        <p className="text-zinc-400 mb-8">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
};

export default AuthContainer;