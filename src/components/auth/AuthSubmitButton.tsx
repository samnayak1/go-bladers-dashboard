interface AuthSubmitButtonProps {
  loading: boolean;
  text: string;
  loadingText?: string;
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  loading,
  text,
  loadingText = "Loading...",
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50"
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default AuthSubmitButton;