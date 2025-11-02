import { Button } from "@/components/ui/button";

export default function PrimaryButton({ children, icon: Icon, background, disabled, ...rest }) {
  return (
    <Button
      disabled={disabled}
      className={`${
        background === "red"
          ? "bg-[#e20000] hover:bg-[#801616]"
          : "bg-[#8b6b05] hover:bg-[#534517]"
      } flex items-center justify-center gap-1 px-2 py-1 my-2
      ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      {...rest}
    >
      {Icon && <Icon className="text-lg sm:text-xl" />}
      <p className="font-bold text-base sm:text-lg">{children}</p>
    </Button>
  );
}