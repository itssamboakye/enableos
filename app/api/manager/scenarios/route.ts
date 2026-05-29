import { NextResponse } from "next/server";
import { requireManager } from "@/lib/auth";
import { listScenariosForCompany } from "@/lib/scenarios/queries";

export async function GET() {
  try {
    const manager = await requireManager();
    if (!manager.companyId) {
      return NextResponse.json({ error: "No company" }, { status: 400 });
    }

    const scenarios = await listScenariosForCompany(manager.companyId);
    return NextResponse.json({ scenarios });
  } catch (error) {
    console.error("[manager/scenarios]", error);
    return NextResponse.json(
      { error: "Failed to load scenarios" },
      { status: 500 }
    );
  }
}
