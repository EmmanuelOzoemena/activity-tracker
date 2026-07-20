export interface Child {
  id: string;
  fullName: string;
  age: number;
  gender: "male" | "female";
  selectedActivities: string[];
}

export interface ParentInfo {
  parentName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface RegistrationState {
  parent: ParentInfo;
  children: Child[];
  paymentProof: File | null;

  // Actions
  setParentInfo: (info: Partial<ParentInfo>) => void;
  addChild: () => void;
  removeChild: (id: string) => void;
  updateChild: (id: string, child: Partial<Child>) => void;
  setPaymentProof: (file: File | null) => void;
  resetForm: () => void;

  // Calculators
  calculateTotalFee: () => number;
}
