"use client";

import { createSkill } from "@/action/skills";
import { useActionState } from "react";

const initialState = {
  message: "",
};

export default function NewSkillPage() {
  const [state, formAction, pending] = useActionState(
    createSkill,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="p-4 max-w-md mx-auto form flex flex-col gap-4"
    >
      <input
        placeholder="Skill name"
        name="name"
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Skill description"
        rows={3}
        name="description"
        className="input input-bordered w-full"
      ></textarea>
      <input
        placeholder="Skill Category"
        name="category"
        className="input input-bordered w-full"
      />

      <p aria-live="polite" className="text-red-500">
        {state?.message}
      </p>

      <button className="btn btn-primary " disabled={pending}>
        {pending ? "Creating..." : "Create Skill"}
      </button>
    </form>
  );
}
