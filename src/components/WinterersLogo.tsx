export default function WinterersLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/images/Logo.png"
        alt="Winterers"
        className="w-full max-w-[107px]"
      />
    </div>
  );
}
