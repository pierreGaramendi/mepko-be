import { Schema, model, Document } from "mongoose";

interface IResource extends Document {
  name: string;
  description: string;
  resourceType?: string;
  parentResource?: Schema.Types.ObjectId;
}

const ResourceSchema = new Schema<IResource>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  resourceType: { type: String },
  parentResource: { type: Schema.Types.ObjectId, ref: "Resource" },
});

export const ResourceModel = model<IResource>("Resource", ResourceSchema);

export async function createGuestRole() {
  const guestRole = await ResourceModel.create({
    name: "PRODUCTS",
    description: "Our products"
  });
}
