import type { EmailFormData } from "@/components/shared/EmailBox";
import { apiRequest } from "./requests";


type NewsletterResponse = {
    success: boolean|string,
    message: string,
    data: {
        id: number,
        email: string,
        createdAt: string
}
}

export const newsletterApi = (data: EmailFormData) =>
  apiRequest<NewsletterResponse>("/email-subscriptions", {
    method: "POST",
    body: JSON.stringify(data),
  });