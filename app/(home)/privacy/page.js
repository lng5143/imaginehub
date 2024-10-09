export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-20 py-40 px-60 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: 8th October 2024</p>
      </div>
      <div className="flex flex-col gap-10">
        <p>ImagineBox (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information when you use the web client for image generation models (the &quot;Service&quot;). By using the Service, you agree to the collection and use of your information in accordance with this Privacy Policy.</p>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">1. Information We Do Not Collect</h2>
          <p>You are required to enter your API keys provided by image model providers (eg. OpenAI, Stability AI, etc) to use the Service. However, your API keys will only be stored locally on your browser. We will not have access to your API keys under any circumstances</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">2. Information We Collect</h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">2.1 Personal Information</h3>
            <p>When you use the Service, we may collect personal information such as your name, email address, and other contact details.</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">2.2 Automatically Collected Information</h3>
            <p>We may collect certain information automatically when you use the Service, including:</p>
            <ul className="list-disc pl-4">
              <li>Device Information: Your device&apos;s IP address, browser type, and operating system.</li>
              <li>Usage Data: Information about your interactions with the Service, such as the features you use and the time spent on the platform.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">2.3 Cookies and Tracking Technologies</h3>
            <p>We may use cookies and similar tracking technologies to enhance your experience and collect information about how the Service is used.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-4">
            <li>To Operate the Service: Including account creation and facilitating interactions with image generation models.</li>
            <li>To Improve the Service: We may use your information to monitor and analyze usage patterns to improve the functionality and performance of the Service.</li>
            <li>To Communicate with You: We may use your contact information to send you updates, respond to inquiries, or provide customer support.</li>
            <li>To Ensure Security: Your information may be used to detect and prevent security threats, fraud, or other illegal activities.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">4. How We Share Your Information</h2>
          <p>We do not sell, trade, or rent your personal information to others. However, we may share your information in the following situations:</p>
          <ul className="list-disc pl-4">
            <li>With Service Providers: We may share your information with trusted third-party service providers who assist us in operating the Service (e.g., hosting, data storage) as long as they agree to keep your information confidential.</li>
            <li>As Required by Law: We may disclose your information if required to do so by law or if we believe such action is necessary to comply with a legal obligation or protect our rights.</li>
          </ul>        
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">5. Data Security</h2>
          <p>We take reasonable measures to protect your personal data from unauthorized access, loss, or misuse.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">6. Data Retention</h2>
          <p>We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">7. Children&apos;s Privacy</h2>
          <p>We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us to request that it be deleted.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">8. Changes to this Privacy Policy</h2>
          <p>We reserve the right to update this Privacy Policy at any time. If we make changes, we will notify you through email and by updating the “Last Updated” date at the top of this page. Your continued use of the Service after any changes indicates your acceptance of the updated Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}