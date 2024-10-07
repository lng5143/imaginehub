import { TERMS } from "@/static-data/terms";

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-20 py-40 items-center px-60 ">
      <h1 className="text-6xl font-bold">Terms & Conditions</h1>
      <div className="flex flex-col gap-10">
        <p>Welcome to [Your Web Client Name]! 
        These Terms of Service (“Terms”) govern your access to and use of our web client for image generation models (the “Service”). By accessing or using the Service, you agree to these Terms. If you do not agree, please do not use the Service.</p>

        {TERMS.map(term => (
          <div key={term.name}
          className="flex flex-col gap-2"
          >
            <h2 className="text-2xl font-bold">{term.name}</h2>
            <p>{term.content}</p>
            {term.subterms.map(subterm => (
              <div key={subterm.name} className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">{subterm.name}</h3>
                <p>{subterm.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}