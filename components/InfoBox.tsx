import Link from "next/link";

type InfoBoxPropsType = {
  title: string;
  description: string;
  linkText: string;
  route: string;
  buttonColor?: string;
  backgroundColor?: string;
};

const InfoBox = ({
  title,
  description,
  linkText,
  route,
  buttonColor = "bg-black",
  backgroundColor = "bg-gray-100",
}: InfoBoxPropsType) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{description}</p>
      <Link
        href={route}
        className={`inline-block ${buttonColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default InfoBox;
