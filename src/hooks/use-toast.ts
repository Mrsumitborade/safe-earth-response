
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

import { toast as uiToast } from "@/components/ui/use-toast";
export { uiToast as uiToastExport };
export const useToast = () => {
    const originalToast = useToastOriginal();
    return { ...originalToast, toast: uiToast };
};
