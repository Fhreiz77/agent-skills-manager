"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SkillFormData {
  name: string;
  description: string;
  content: string;
  isPublic: boolean;
}

interface ActionResult {
  message: string;
  success?: boolean;
  error?: string;
  skillId?: number;
}

// Untuk useActionState (app/skills/create/page.tsx)
export async function createSkill(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!name || !description) {
      return { message: "Name and description are required", success: false };
    }

    const userId = 1; // TODO: ambil dari session/auth

    const skill = await prisma.skill.create({
      data: {
        name,
        description,
        content: category,
        isPublic: true,
        authorId: userId,
      },
    });

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { message: "Skill created!", success: true, skillId: skill.id };
  } catch (error) {
    console.error("Create skill error:", error);
    return { message: "Failed to create skill", success: false };
  }
}

// Untuk client-side manual call (app/dashboard/skills/new/page.tsx)
export async function createSkillDirect(
  data: SkillFormData,
  userId: number
): Promise<ActionResult> {
  try {
    if (!data.name || !data.description) {
      return { message: "Name and description are required", success: false };
    }

    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        description: data.description,
        content: data.content,
        isPublic: data.isPublic,
        authorId: userId,
      },
    });

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { message: "Skill created!", success: true, skillId: skill.id };
  } catch (error) {
    console.error("Create skill error:", error);
    return { message: "Failed to create skill", success: false };
  }
}

export async function updateSkill(
  id: number,
  data: SkillFormData,
  userId: number
): Promise<ActionResult> {
  try {
    const existing = await prisma.skill.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existing || existing.authorId !== userId) {
      return { message: "Not authorized to edit this skill", success: false };
    }

    await prisma.skill.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        content: data.content,
        isPublic: data.isPublic,
      },
    });

    revalidatePath("/skills");
    revalidatePath(`/skills/${id}`);
    revalidatePath("/dashboard");

    return { message: "Skill updated!", success: true, skillId: id };
  } catch (error) {
    console.error("Update skill error:", error);
    return { message: "Failed to update skill", success: false };
  }
}

export async function deleteSkill(
  id: number,
  userId: number
): Promise<ActionResult> {
  try {
    const existing = await prisma.skill.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existing || existing.authorId !== userId) {
      return { message: "Not authorized to delete this skill", success: false };
    }

    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { message: "Skill deleted!", success: true };
  } catch (error) {
    console.error("Delete skill error:", error);
    return { message: "Failed to delete skill", success: false };
  }
}