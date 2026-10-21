import Button from "./Button";
export default function SectionHead({
  eyebrow,
  title,
  sub,
  action,
  to,
  dark,
  center,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: string;
  to?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-4 ${center ? "items-center text-center" : "sm:flex-row sm:items-center sm:justify-between"}`}
    >
      <div>
        {eyebrow && (
          <p className="section-eyebrow">
            {eyebrow}
          </p>
        )}
        <h2 className={`section-title ${dark ? "!text-white" : ""}`}>{title}</h2>
        {sub && (
          <p
            className={`mt-5 text-sm sm:text-base ${dark ? "text-[#F0F4F8]" : "text-[#98A1AC]"}`}
          >
            {sub}
          </p>
        )}
      </div>
      {action && (
        <Button
          to={to}
          variant={dark ? "outline" : "primary"}
          size="sm"
          className="section-head-btn rounded-[13px] w-max"
        >
          <span className="relative z-10">{action}</span>
        </Button>
      )}
    </div>
  );
}
