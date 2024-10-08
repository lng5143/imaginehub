export default function TermsPage() {
  return (
    <div className="flex flex-col gap-20 py-40 px-10 md:px-20 lg:px-60 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold">Terms & Conditions</h1>
        <p className="text-sm text-gray-500">Last updated: 8th October 2024</p>
      </div>
      <div className="flex flex-col gap-10">
        <p>
          Welcome to ImagineBox! These Terms of Service (“Terms”) govern your
          access to and use of our web client for image generation models (the
          “Service”). By accessing or using the Service, you agree to these
          Terms. If you do not agree, please do not use the Service.
        </p>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">1. Use of Service</h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">1.1 User Accounts</h3>
            <p>
              You need to create an account to access the Service, using your
              email or a third-party authentication provider. We are currently
              offering to sign in through the Google authentication service. You
              are responsible for maintaining the confidentiality of your email
              and your accounts with third-party authentication providers. You
              are responsible for any activity that occurs through your account.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">1.3 Use of APIs</h3>
            <p>
              The Service allows you to interface with image generation models
              (such as DALL-E, Stable Diffusion, etc.) using your own API keys.
              You agree to comply with the terms and conditions of the APIs you
              use and are responsible for maintaining your own API keys. 
            </p>
            <p>
              Your API keys will only be stored locally on your browser, and
              will not be saved to our server under any circumstances.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">1.4 Prohibited Activities</h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-4">
              <li>Use the Service for any unlawful purpose.</li>
              <li>Violate the intellectual property rights of others.</li>
              <li>
                Generate content that is harmful, abusive, harassing, or
                defamatory.
              </li>
              <li>
                Attempt to gain unauthorized access to the Service or any
                systems or networks connected to it.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            2. User Content and Generated Images
          </h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">2.1 Generated Content</h3>
            <p>
              You retain ownership of any images or content generated using the
              Service. However, by using the Service, you grant us a worldwide,
              royalty-free, non-exclusive license to store and display the
              content for the purpose of operating and improving the Service.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">
              2.2 Responsibility For Content
            </h3>
            <p>
              You are solely responsible for any content you generate or upload
              using the Service. We do not monitor or review content generated
              by users, but we reserve the right to remove any content that
              violates these Terms.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">2.3 Prohibited Content</h3>
            <p>
              You may not use the Service to generate or distribute content that
              is illegal, obscene, hateful, or otherwise inappropriate. This
              includes but does not limit to content that promotes violence,
              discrimination, or violates the rights of others.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">2.4 Content Storage</h3>
            <p>
              We will make best efforts to ensure that your generated content
              remains accessible at all times, but we cannot guarantee that your
              data will never be lost. We recommend that you backup your data in
              multiple locations to prevent potential data loss.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">3. Fees and Payment</h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">3.1 Service Fees</h3>
            <p>
              Access to certain features of the Service requires payment of
              fees. These fees will be clearly outlined at the time of purchase,
              and you agree to pay all applicable charges.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">3.3 Refunds</h3>
            <p>
              All payments made through the Service are non-refundable, unless
              otherwise stated in writing.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">4.1 Service Ownership</h3>
            <p>
              All rights, titles, and interests in the Service, including but
              not limited to the software, design, and features, are owned by
              us.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">4.2 Trademarks</h3>
            <p>
              Any trademarks associated with Service are owned by us. You may
              not use any trademarks without our prior written consent.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for
            any indirect, incidental, special, or consequential damages,
            including loss of profits, revenue, data, or use, arising out of
            your use of the Service.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">6. Indemnification</h2>
          <p>
            You agree to indemnify and hold us harmless from any claims,
            damages, liabilities, costs, or expenses arising from your use of
            the Service, violation of these Terms, or infringement of any
            third-party rights.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">7. Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time
            without notice if we believe you have violated these Terms. Upon
            termination, your rights to use the Service will immediately cease.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">8. Changes to the Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make
            changes, we will notify you through email and by updating the “Last
            Updated” date at the top of these Terms. Your continued use of the
            Service after changes are made constitutes your acceptance of the
            new Terms & Conditions.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">9. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of Vietnam, without regard to its conflict of laws principles.
          </p>
        </div>
      </div>
    </div>
  );
}
