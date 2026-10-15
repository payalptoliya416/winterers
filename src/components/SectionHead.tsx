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
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#7EC8E3]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-medium md:text-4xl">{title}</h2>
        {sub && (
          <p
            className={`mt-5 max-w-xl text-base ${dark ? "text-[#F0F4F8]" : "text-navy/50"}`}
          >
            {sub}
          </p>
        )}
      </div>
      {action && (
        <Button to={to} variant={dark ? "outline" : "primary"} size="sm" pill className="rounded-[18px]">
          {action}
        </Button>
      )}
    </div>
  );
}
