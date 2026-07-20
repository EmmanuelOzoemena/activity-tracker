import { apiClient } from "./api";
import type { ParentInfo, Child } from "../types/form";

export interface RegistrationPayload {
  parent: ParentInfo;
  children: Child[];
  paymentProof: File;
}

export const campService = {
  /**
   * Submit Summer Camp Registration with Payment Receipt
   */
  async submitRegistration({
    parent,
    children,
    paymentProof,
  }: RegistrationPayload) {
    const formData = new FormData();

    // Append parent fields
    formData.append("parentName", parent.parentName);
    formData.append("phone", parent.phone);
    formData.append("whatsapp", parent.whatsapp);
    formData.append("email", parent.email);
    formData.append("address", parent.address);

    // Append children array as JSON string
    formData.append("children", JSON.stringify(children));

    // Append payment receipt file (matches req.file key 'receipt' in backend route)
    formData.append("receipt", paymentProof);

    const response = await apiClient.post("/camp/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getAllRegistrations: async () => {
    const response = await apiClient.get("/camp/registrations");
    return response.data; 
  },
};
