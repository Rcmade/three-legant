import React from "react";

type CompanyValueCardProps = {
  icon: React.ElementType;
  title: string;
  sortDesc: string;
};

const CompanyValueCard: React.FC<CompanyValueCardProps> = ({
  icon: Icon,
  title,
  sortDesc,
}) => {
  return (
    <div className="flex min-w-44 flex-1 flex-col justify-center gap-6 bg-accent px-6 py-8">
      <Icon className="h-12 w-12" /> {/* Dynamic icon component */}
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p>{sortDesc}</p>
      </div>
    </div>
  );
};

export default CompanyValueCard;
