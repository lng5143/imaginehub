
export default function TermsPage() {
  return (
    <div className="flex flex-col gap-20 py-40 items-center px-60 ">
      <h1 className="text-6xl font-bold">Terms & Conditions</h1>
      <div className="flex flex-col gap-10">
        <p>Welcome to [Your Web Client Name]! These Terms of Service (“Terms”) govern your access to and use of our web client for image generation models (the “Service”). By accessing or using the Service, you agree to these Terms. If you do not agree, please do not use the Service.</p>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">1. Use of Service</h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">1.1 Eligibility</h3>
            <p>To use the Service, you must be at least 18 years old and have the legal capacity to enter into binding agreements.</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">1.2 User Accounts</h3>
            <p>You may need to create an account to access certain features of the Service. You are responsible for maintaining the confidentiality of your account and password. You are responsible for any activity that occurs through your account.</p>
         </div>
         <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">1.3 Use of APIs</h3>
            <p>The Service allows you to interface with image generation models (such as DALL-E, Stable Diffusion, etc.) using your own API keys. You agree to comply with the terms and conditions of the APIs you use and are responsible for maintaining your own API keys.</p>
         </div>
         <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">1.4 Prohibited Activities</h3>
            <p>You agree not to: 
              <ul className="list-disc pl-4">
                <li>Use the Service for any unlawful purpose.</li>
                <li>Violate the intellectual property rights of others.</li>
                <li>Generate content that is harmful, abusive, harassing, or defamatory.</li>
                <li>Attempt to gain unauthorized access to the Service or any systems or networks connected to it.</li>
              </ul>
            </p>
         </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">2. User Content and Generated Images</h2>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">2.1 User Content</h3>
          <p>You are solely responsible for any content you submit to the Service. By submitting content, you grant us a license to use, modify, and distribute your content in accordance with this Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}