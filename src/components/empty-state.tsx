import Image from "next/image";

interface IProps {
  title: string;
  description: string;
  image?: string;
}
export const EmptyState = ({
  description,
  title,
  image = "/assets/empty.svg",
}: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={image}
        width={240}
        height={240}
        alt="Empty image"
        className="object-cover"
      />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
