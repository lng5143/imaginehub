import { CONTACT_EMAIL } from "@/const/consts";

export default function RefundPage() {
  return (
    <div className="flex flex-col gap-20 py-40 px-10 md:px-20 lg:px-60 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold">Refund Policy</h1>
        <p className="text-sm text-gray-500">Last updated: 8th October 2024</p>
      </div>
      <div className="flex flex-col gap-10">
        <p>Thank you for using ImagineBox. This Refund Policy explains when and how refunds are issued for purchases made through our website (the “Service”). By making a purchase, you agree to this policy.</p>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">1. General Refund Terms</h2>
          <p>All sales and payments made through the Service are final and non-refundable, except as specifically stated in this policy or required by applicable law.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">2. Eligibility for Refunds</h2>
          <p>Refunds may be issued in the following circumstances:</p>
          <ul className="list-disc pl-4">
            <li>Service Issues: If a technical issue or malfunction with the Service, not caused by the user, prevents you from using a paid feature as intended, you may be eligible for a refund.</li>
            <li>Unauthorized Transactions: If a payment was made fraudulently or without your authorization, please contact us immediately to investigate the issue and determine if a refund is appropriate.</li>
          </ul>
          <p>Refunds are not provided for:</p>
          <ul className="list-disc pl-4">
            <li>Change of mind or dissatisfaction with the results generated by image generation models.</li>
            <li>User error or failure to comply with the Service instructions.</li>
            <li>Issues related to third-party services or APIs that are not controlled by ImagineBox.</li>
          </ul>        
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">3. How to Request a Refund</h2>
          <p>To request a refund, please contact us at {CONTACT_EMAIL} within 14 days of the transaction, including the following details:</p>
          <ul className="list-disc pl-4">
            <li>Your account email.</li>
            <li>The transaction ID or receipt provided to you through email at the time of purchase.</li>
            <li>A description of the issue or reason for the refund request.</li>
          </ul>        
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">4. Refund Process</h2>
          <p>Once we receive your refund request, we will review the details and notify you via email whether your request has been approved or denied. If approved, the refund will be processed to the original payment method within 7 business days.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">5. Refund Denials</h2>
          <p>We reserve the right to deny refund requests that do not meet the conditions outlined in this policy or if there is evidence of abuse or misuse of the Service.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">6. Changes to this Privacy Policy</h2>
          <p>We reserve the right to update this Refund Policy at any time. If we make changes, we will notify you through email and by updating the “Last Updated” date at the top of this page. Your continued use of the Service after any changes indicates your acceptance of the updated Refund Policy.</p>
        </div>
      </div>
    </div>
  )
}