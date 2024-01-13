import db from "@/lib/prismadb";
import { CompanionForm } from "../_components/companion-form";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  let companion;

  if (params.companionId !== "new") {
    companion = await db.companion.findUnique({
      where: { id: params.companionId },
    });
  } else {
    companion = null
  }

  const categories = await db.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
